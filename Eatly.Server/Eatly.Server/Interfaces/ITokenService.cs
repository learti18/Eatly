using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eatly.Server.Models;

namespace Eatly.Server.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(ApplicationUser user);
        Task<RefreshToken> GenerateRefreshToken(ApplicationUser user, string deviceId);
        Task<bool> ValidateRefreshToken(string userId, string refreshToken, string deviceId);
        Task<string> GetUserIdFromRefreshToken(string refreshToken);
        Task RevokeRefreshToken(string userId, string deviceId);
        Task RevokeAllRefreshTokens(string userId);
    }
}