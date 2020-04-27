﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Carpool.Concerns;
using Carpool.Data;
using Carpool.Interfaces;
using Carpool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.Controllers
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
        public IActionResult GetRideMatches([FromBody] MatchRequest model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponse> Matches = IRiderService.GetMatches(model);
            return Ok(new
            {
                Matches = Matches,
            });
        }
        [HttpPost]
        public IActionResult RequestRide([FromBody] RideRquestModel model)
        {
            if (model == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            string result = IRiderService.RequestRide(user, model);
            if (result == "Ok")
            {
                return Ok(new 
                { 
                    message ="Ride Offered Successfully."
                });
            }
            return BadRequest(new
            {
                error = "Ride could not be offered."
            });
        }
        [HttpGet]
        public IActionResult GetRequests()
        {
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            List<MatchResponse> matches = IRiderService.GetRequests(user);
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
            List<MatchResponse> matches = IRiderService.GetBookings(user);
            return Ok(new
            {
                bookings = matches
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
            string result = IRiderService.CancelBooking(user, id);
            if (result == "Ok")
            {
                return Ok(new
                {
                    message = "Booking Cancelled Successfully."
                });
            }
            return BadRequest(new
            {
                error = "Booking could not be cancelled."
            });
        }
        [HttpPost]
        public IActionResult CancelRequest([FromBody]string id)
        {
            if (id == null)
            {
                return BadRequest("invalid object");
            }
            string email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Email.Equals(email));
            string result = IRiderService.CancelRequest(user, id);
            if (result == "Ok")
            {
                return Ok(new
                {
                    message = "Request Cancelled Successfully."
                });
            }
            return BadRequest(new
            {
                error = "Request could not be cancelled."
            });
        }
    }
}