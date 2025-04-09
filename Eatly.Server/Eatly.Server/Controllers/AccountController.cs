using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eatly.Server.Data;
using Eatly.Server.Dtos.Account;
using Eatly.Server.Extensions;
using Eatly.Server.Interfaces;
using Eatly.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eatly.Server.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<ApplicationUser> userManager,
          SignInManager<ApplicationUser>
          signInManager,
          ITokenService tokenService,
          ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

                if (user == null) return Unauthorized("Invalid username!");

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect!");

                var refreshToken = await _tokenService.GenerateRefreshToken(user, loginDto.DeviceId);

                SetRefreshTokenCookie(refreshToken.Token);

                var roles = await _userManager.GetRolesAsync(user);
                var accessToken = await _tokenService.GenerateAccessToken(user);
                var expiresAt = DateTime.UtcNow.AddMinutes(15);

                return Ok
                    (
                        new NewUserDto
                        {
                            Username = user.UserName,
                            Email = user.Email,
                            Token = accessToken,
                            ExpiresAt = expiresAt,
                            Roles = roles.ToList()
                        }
                    );
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal server error", error = e.Message });
            }
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new ApplicationUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        var refreshToken = await _tokenService.GenerateRefreshToken(appUser, registerDto.DeviceId);

                        SetRefreshTokenCookie(refreshToken.Token);

                        var roles = new List<string> { "User" };

                        return Ok(new NewUserDto
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Token = await _tokenService.GenerateAccessToken(appUser),
                            Roles = roles,
                            ExpiresAt = DateTime.UtcNow.AddMinutes(15)
                        });
                    }
                    else
                    {
                        return BadRequest(roleResult.Errors);
                    }
                }
                else
                {
                    return BadRequest(createdUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal server error", error = e.Message });
            }
        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var refreshToken = Request.Cookies["refreshToken"];
                var storedToken = await _context.RefreshTokens
                    .FirstOrDefaultAsync(t => t.Token == refreshToken && t.DeviceId == refreshTokenDto.DeviceId);

                if (storedToken == null)
                {
                    return NotFound("No refresh token found");
                }

                var userId = await _tokenService.GetUserIdFromRefreshToken(refreshToken);

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                var isValid = await _tokenService.ValidateRefreshToken(userId, refreshToken, refreshTokenDto.DeviceId);

                if (!isValid)
                {
                    RemoveRefreshTokenCookie();
                    return BadRequest("Invalid refresh token or expired");
                }

                var newRefreshToken = await _tokenService.GenerateRefreshToken(user, refreshTokenDto.DeviceId);
                var newAccessToken = await _tokenService.GenerateAccessToken(user);
                var roles = await _userManager.GetRolesAsync(user);
                var expiresAt = DateTime.UtcNow.AddMinutes(15);

                SetRefreshTokenCookie(newRefreshToken.Token);

                return Ok(new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = newAccessToken,
                    ExpiresAt = expiresAt,
                    Roles = roles.ToList()
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal server error", error = e.Message });
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutDto logoutDto)
        {
            try
            {
                var userId = User.GetUserId();

                if (string.IsNullOrEmpty(userId))
                    return BadRequest("User not found");

                if (!string.IsNullOrEmpty(logoutDto.DeviceId))
                {
                    await _tokenService.RevokeRefreshToken(userId, logoutDto.DeviceId);
                    RemoveRefreshTokenCookie();

                    return Ok(new { messsage = "Logged out from device successfully" });
                }

                await _tokenService.RevokeAllRefreshTokens(userId);
                RemoveRefreshTokenCookie();

                return Ok(new { messsage = "Logged out from all devices successfully" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal server error", error = e.Message });
            }
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = true,
                SameSite = SameSiteMode.Strict
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
        private void RemoveRefreshTokenCookie()
        {
            Response.Cookies.Delete("refreshToken");
        }

    }
}