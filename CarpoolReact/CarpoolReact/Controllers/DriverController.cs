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
            string result = IDriverService.CreateRide(model, user);
            if (result == "Ok")
            {
                return Ok(new { 
                    status = 200,
                    message = "Ride Created Successfully."
                });
            }
            return BadRequest(new
            {
                error = result
            });
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
                return Ok(new
                {
                    status = 200,
                    message = "Driver Registered Succesfully."
                });
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
            if (Matches != null)
            {
                return Ok(new
                {
                    status = 200,
                    Matches = Matches,
                });
            }
            return BadRequest(new
            {
                error = "Unable to fetch rides"
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
            string result = IDriverService.ConfirmBooking(user, model);
            if (result == "Ok")
            {
                string text;
                if (model.Accepted == true)
                {
                    text = "Ride Requested Accepted";
                }
                else
                {
                    text = "Ride Request Rejected";
                }
                return Ok(new
                {
                    status = 200,
                    message = text
                });
            }
            return BadRequest(new
            {
                error = result
            });
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
            string result = IDriverService.CancelBooking(user, id);
            if (result == "Ok")
            {
                return Ok(new
                {
                    status = 200,
                    message = "Booking Cancelled"
                });
            }
            return BadRequest(new
            {
                error = result
            });
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
            object RideDetails = IDriverService.GetRideDetails(rideId);
            if (RideDetails != null)
            {
                return Ok(new { Status = 200, OpenedRide = RideDetails });
            }
            return BadRequest(new
            {
                error = "Unable to fetch Ride Details"
            });
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
            object driverDetails = IDriverService.Update(user, model);
            if (driverDetails != null)
            {
                return Ok(new
                {
                    status = 200,
                    driver = driverDetails
                });
            }
            return BadRequest(new
            {
                error = "Unable to update Driver Details."
            });
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
                    status = 200,
                    message = "Booking Cancelled Successfully."
                });
            }
            return BadRequest(new
            {
                error = result
            });
        }
        [HttpGet]
        public IActionResult GetPromotions()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            PromotionRequest response = IDriverService.GetPromotions(user);
            if (response != null)
            {
                return Ok(new
                {
                    status = 200,
                    promotion = response
                });
            }
            return BadRequest(new
            {
                error = "Unabe to fetch Promotion Details"
            });
        }
        [HttpPut]
        public IActionResult UpdatePromotion(PromotionRequest model)
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            PromotionRequest updatedPromotion = IDriverService.UpdatePromotion(model, user);
            if (updatedPromotion != null)
            {
                return Ok(new
                {
                    status = 200,
                    promotion = updatedPromotion
                });
            }
            return BadRequest(new
            {
                error = "Unable to update Promotion Details."
            });
        }
        [HttpGet]
        public IActionResult GetDetails()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            object driverDetails = IDriverService.GetDetails(user);
            if (driverDetails != null)
            {
                return Ok(new
                {
                    status = 200,
                    driver = driverDetails
                });
            }
            return BadRequest(new
            {
                error = "Unable to fetch Driver Details"
            });
        }
    }
}



