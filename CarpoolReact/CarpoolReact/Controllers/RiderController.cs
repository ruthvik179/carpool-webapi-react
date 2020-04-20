using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CarpoolReact.Data;
using CarpoolReact.Models;
using CarpoolReact.Interfaces;
using CarpoolReact.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CarpoolReact.ResponseModels;

namespace CarpoolReact.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize]
    public class RiderController : ControllerBase
    {
        private readonly CarpoolContext context;
        private readonly IRiderService IRiderService;
        public RiderController(CarpoolContext context, IRiderService iRiderService)
        {
            this.context = context;
            this.IRiderService = iRiderService;
        }
        [HttpPost]
        public IActionResult GetRideMatches([FromBody] MatchViewModel model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponseModel> Matches = IRiderService.GetMatches(model);
            return Ok(new
            {
                Matches = Matches,
            });
        }
        [HttpPost]
        public IActionResult RequestRide([FromBody] RequestViewModel model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IRiderService.RequestRide(user, model);
            return StatusCode(code);
        }
        [HttpGet]
        public IActionResult GetRequests()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponseModel> matches = IRiderService.GetRequests(user);
            return Ok(new 
            {
                requests = matches 
            });
        }
        [HttpGet]
        public IActionResult GetBookings()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponseModel> matches = IRiderService.GetBookings(user);
            return Ok(new
            {
                bookings = matches
            });
        }
    }
}