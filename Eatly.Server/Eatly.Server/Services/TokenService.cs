using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Eatly.Server.Data;
using Eatly.Server.Interfaces;
using Eatly.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Eatly.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public TokenService(IConfiguration config, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            _userManager = userManager;
            _context = context;
        }

        public async Task<string> GenerateAccessToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<RefreshToken> GenerateRefreshToken(ApplicationUser user, string deviceId)
        {
            var tokenValue = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

            var refreshToken = new RefreshToken
            {
                Token = tokenValue,
                DeviceId = deviceId,
                ExpiryTime = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            };

            var existingToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.UserId == user.Id && t.DeviceId == deviceId);

            if (existingToken != null)
            {
                _context.RefreshTokens.Remove(existingToken);
            }

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return refreshToken;
        }

        public async Task<string> GetUserIdFromRefreshToken(string refreshToken)
        {
            var token = await _context.RefreshTokens
                    .FirstOrDefaultAsync(r => r.Token == refreshToken);

            return token?.UserId;
        }

        public async Task RevokeAllRefreshTokens(string userId)
        {
            var tokens = await _context.RefreshTokens
                    .Where(t => t.UserId == userId)
                    .ToListAsync();

            _context.RefreshTokens.RemoveRange(tokens);
            await _context.SaveChangesAsync();
        }

        public async Task RevokeRefreshToken(string userId, string deviceId)
        {
            var token = await _context.RefreshTokens
                    .FirstOrDefaultAsync(t => t.UserId == userId && t.DeviceId == deviceId);

            _context.RefreshTokens.Remove(token);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ValidateRefreshToken(string userId, string refreshToken, string deviceId)
        {
            var token = await _context.RefreshTokens
                    .FirstOrDefaultAsync(t =>
                        t.UserId == userId &&
                        t.Token == refreshToken &&
                        t.DeviceId == deviceId);

            return token != null && !token.isExpired;
        }
    }
}