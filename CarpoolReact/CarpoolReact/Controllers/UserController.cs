using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Data;
using Carpool.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Carpool.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Carpool.Concerns;

namespace Carpool.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly CarpoolContext context;
        public readonly IUserService IUserService;
        private readonly UserManager<ApplicationUser> userManager;
        public UserController(UserManager<ApplicationUser> userManager, CarpoolContext context, IUserService iUserService)
        {
            this.IUserService = iUserService;
            this.context = context;
            this.userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            User userResponse = IUserService.GetUser(user);
            return Ok(new 
            { 
                status = 200,
                user = userResponse
            });
        }
        [HttpPut]
        public IActionResult Update(User model)
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            var userName = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(model.Email) && !c.Email.Equals(email));
            if (userName != null)
            {
                return BadRequest(new
                {
                    error = "Email is already being used by another account"
                });
            }
            User userResponse = IUserService.Update(user, model);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            };
            var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"));
            var token = new JwtSecurityToken(
                issuer: "http://oec.com",
                audience: "http://oec.com",
                expires: DateTime.UtcNow.AddDays(7),
                claims: claims,
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256)
                );
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                user = userResponse
            });
            
        }


    }
}