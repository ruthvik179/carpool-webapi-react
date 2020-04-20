using CarpoolReact.Models;
using CarpoolReact.ResponseModels;
using CarpoolReact.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.Interfaces
{
    public interface IDriverService
    {
        public int CreateRide(OfferViewModel model, ApplicationUser user);
        public int RegisterDriver(RegisterDriverViewModel model, ApplicationUser user);
        public int DeleteRide(string rideId, ApplicationUser user);
        public List<MatchResponseModel> GetRides(ApplicationUser user);
        public int ConfirmBooking(ApplicationUser user, BookingViewModel model);
        public int CancelBooking(ApplicationUser user, string bookingId);
        public bool IsADriver(ApplicationUser user);
        public object GetRideDetails(string rideId);
        public object Update(ApplicationUser user, RegisterDriverViewModel model);
    }
}
