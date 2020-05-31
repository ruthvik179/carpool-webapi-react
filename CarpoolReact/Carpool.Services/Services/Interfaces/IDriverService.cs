using Carpool.Concerns;
using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Interfaces
{
    public interface IDriverService
    {
        public string CreateRide(OfferRequest model, ApplicationUser user);
        public string RegisterDriver(RegisterDriverRequest model, ApplicationUser user);
        public List<MatchResponse> GetRides(ApplicationUser user);
        public string ConfirmBooking(ApplicationUser user, BookingRequest model);
        public string CancelBooking(ApplicationUser user, string bookingId);
        public bool IsADriver(ApplicationUser user);
        public object GetRideDetails(string rideId);
        public object Update(ApplicationUser user, RegisterDriverRequest model);
        public string CancelRide(string rideId);
        public PromotionRequest UpdatePromotion(PromotionRequest model, ApplicationUser user);
        public PromotionRequest GetPromotions(ApplicationUser user);
        public object GetDetails(ApplicationUser user);
    }
}
