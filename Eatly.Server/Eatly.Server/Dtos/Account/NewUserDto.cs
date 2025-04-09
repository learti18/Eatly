using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eatly.Server.Dtos.Account
{
    public class NewUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }
}