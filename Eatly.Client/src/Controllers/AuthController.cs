using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _authService.LoginAsync(loginDto);
                SetRefreshTokenCookie(user.RefreshToken);

                return Ok(new UserDto
                {
                    Email = user.Email,
                    Token = user.Token,
                    Roles = user.Roles,
                    ExpiresAt = user.ExpiresAt,
                    FirebaseToken = user.FirebaseToken
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
} 