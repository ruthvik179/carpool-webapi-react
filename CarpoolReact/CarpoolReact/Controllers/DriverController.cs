using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CarpoolReact.Data;
using CarpoolReact.Interfaces;
using CarpoolReact.Models;
using CarpoolReact.ViewModels;
using CarpoolReact.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using CarpoolReact.ResponseModels;

namespace CarpoolReact.Controllers
{
    
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize]
    public class DriverController : ControllerBase
    {
        private readonly IDriverService IDriverService;
        private readonly CarpoolContext context;
        public DriverController(IDriverService driverService, CarpoolContext context)
        {
            this.IDriverService = driverService;
            this.context = context;
        }

        [HttpPost]
        public IActionResult CreateRide([FromBody] OfferViewModel model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IDriverService.CreateRide(model, user);
            return StatusCode(code);
        }
        [HttpPost]
        public IActionResult RegisterDriver([FromBody] RegisterDriverViewModel model )
        {
            if(model == null)
            {
                BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IDriverService.RegisterDriver(model, user);
            return StatusCode(code);
        }
        [HttpPost]
        public IActionResult DeleteRide([FromBody]string rideId)
        {
            if(rideId == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IDriverService.DeleteRide(rideId, user);
            return StatusCode(code);
        }

        [HttpGet]
        public IActionResult GetRides()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponseModel> Matches = IDriverService.GetRides(user);
            return Ok(new
            {
                Matches = Matches,
            });
        }
        [HttpPost]
        public IActionResult ConfirmBooking([FromBody]BookingViewModel model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IDriverService.ConfirmBooking(user, model);
            return StatusCode(code);
        }
        [HttpPost]
        public IActionResult CancelBooking([FromBody]string id)
        {
            if (id == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            int code = IDriverService.CancelBooking(user, id);
            return StatusCode(code);
        }
        [HttpGet]
        public IActionResult IsADriver()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            bool IsADriver = IDriverService.IsADriver(user);
            return Ok(new {
                IsADriver = IsADriver,
            });
        }
        [HttpGet]
        public IActionResult GetRideDetails(string rideId)
        {
            if (rideId == "")
            {
                return BadRequest("Invalid Object");
            }
            return Ok(IDriverService.GetRideDetails(rideId));
        }
        [HttpPut]
        public IActionResult Update(RegisterDriverViewModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid Object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            object response = IDriverService.Update(user, model);
            return Ok(response);
        }
    }
}



