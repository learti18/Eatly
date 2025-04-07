using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eatly.Server.Dtos.Account
{
    public class RefreshTokenDto
    {
        [Required]
        public string DeviceId { get; set; }
    }
}