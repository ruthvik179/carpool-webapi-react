using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Carpool.Data;
using Carpool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Carpool.Interfaces;
using Carpool.Concerns;

namespace Carpool.Controllers
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
        public IActionResult CreateRide([FromBody] OfferRequest model)
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
        public IActionResult RegisterDriver([FromBody] RegisterDriverRequest model )
        {
            if(model == null)
            {
                BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            string result = IDriverService.RegisterDriver(model, user);
            if(result =="Ok")
            {
                return Ok();
            }
            return BadRequest(new
            {
                error = result
            });
        }

        [HttpGet]
        public IActionResult GetRides()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponse> Matches = IDriverService.GetRides(user);
            return Ok(new
            {
                Matches = Matches,
            });
        }
        [HttpPost]
        public IActionResult ConfirmBooking([FromBody]BookingRequest model)
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
        public IActionResult Update(RegisterDriverRequest model)
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
        [HttpPost]
        public IActionResult CancelRide([FromBody] string rideId)
        {
            if (rideId == "")
            {
                return BadRequest("Invalid Object");
            }
            string result = IDriverService.CancelRide(rideId);
            if (result == "Ok")
            {
                return Ok(new
                {
                    message = "Booking Cancelled Successfully."
                });
            }
            return BadRequest(new
            {
                error = result
            });
        }
    }
}



