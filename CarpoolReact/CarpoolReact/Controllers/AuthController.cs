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
using Carpool.Concerns;
using Microsoft.Extensions.Configuration;
namespace Carpool.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userName = await userManager.FindByEmailAsync(model.Email);
            if(userName!=null)
            {
                return BadRequest(new
                {
                    error = "Email is already being used by another account"
                });
            }
            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email, Name = model.Name, PhoneNumber = model.PhoneNumber };
            var result = await userManager.CreateAsync(user, model.Password);
            if(result.Succeeded)
            {
                LoginRequest loginmodel = new LoginRequest();
                loginmodel.Email = model.Email;
                loginmodel.Password = model.Password;
                return await Login(loginmodel);
            }
            foreach(var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return BadRequest(model);
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var user = await userManager.FindByNameAsync(model.Email);
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
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
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        //public async Task<IActionResult> Logout()
        //{
        //    //await signInManager.SignOutAsync();
        //    return await Ok();
        //}

    }
}
