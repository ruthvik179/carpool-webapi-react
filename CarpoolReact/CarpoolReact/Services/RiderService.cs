using CarpoolReact.Data;
using CarpoolReact.Interfaces;
using CarpoolReact.Models;
using CarpoolReact.ResponseModels;
using CarpoolReact.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.Services
{
    public class RiderService : IRiderService
    {
        private readonly CarpoolContext context;
        private IHelperService HelperService { get; set; }

        public RiderService(CarpoolContext context)
        {
            HelperService = new HelperService();
            this.context = context;
        }

        public List<MatchResponseModel> GetMatches(MatchViewModel model)
        {
            List<Ride> rides = new List<Ride>();
            List<MatchResponseModel> matches = new List<MatchResponseModel>();
            rides = context.Rides.Where(c => c.Date.Equals(Convert.ToDateTime(model.Date)) && c.Time.Equals(model.Time)).ToList();
            foreach (Ride ride in rides)
            {
                List<Location> viaPoints = context.Locations.Where(c => c.RideId.Equals(ride.Id)).ToList();
                var source = viaPoints.FirstOrDefault(c => c.Latitude.Equals(model.Source.Latitude) && c.Longitude.Equals(model.Source.Longitude));
                var destination = viaPoints.FirstOrDefault(c => c.Latitude.Equals(model.Destination.Latitude) && c.Longitude.Equals(model.Destination.Longitude));
                if (source != null && destination != null)
                {
                    List<Seat> seats = context.Seats.Where(c => c.RideId.Equals(ride.Id) && c.SeatState.Equals(SeatState.Free)).ToList();
                    if (seats.Count > 0)
                    {
                        Driver driver = context.Drivers.FirstOrDefault(c => c.Id.Equals(ride.DriverId));
                        ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                        MatchResponseModel match = new MatchResponseModel(user.Name, source.Name, destination.Name, model.Date, ride.Time, ride.Id, model.Distance * 10, seats.Count);
                        matches.Add(match);
                    }
                }
            }
            return matches;
        }

        public int RequestRide(ApplicationUser user, RequestViewModel model)
        {
            try
            {
                Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(model.RideId));
                Rider rider = context.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
                if(rider == null)
                {
                    rider = new Rider(user.Id, user.Id);
                    context.Riders.Add(rider);
                }
                Location source = context.Locations.FirstOrDefault(c => c.Name.Equals(model.Source.Name) && c.RideId.Equals(ride.Id));
                Location destination = context.Locations.FirstOrDefault(c => c.Name.Equals(model.Destination.Name) && c.RideId.Equals(ride.Id));
                RideRequest rideRequest = new RideRequest(
                    HelperService.GenerateId("REQ"),
                    model.RideId,
                    rider.Id,
                    ride.DriverId,
                    source.Id,
                    destination.Id,
                    model.Distance * Constants.Price
                    );
                context.RideRequests.Add(rideRequest);
                context.SaveChanges();
                return 200;
            }
            catch (Exception)
            {
                return 400;
            }
        }

        public List<MatchResponseModel> GetBookings(ApplicationUser user)
        {
            List<MatchResponseModel> matches = new List<MatchResponseModel>();
            Rider rider = context.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if (rider == null)
            {
                return matches;
            }
            List<Booking> Bookings = context.Bookings.Where(c => c.RiderId.Equals(rider.Id)).ToList();
            foreach (Booking booking in Bookings)
            {
                Driver driver = context.Drivers.FirstOrDefault(c => c.Id.Equals(booking.DriverId));
                ApplicationUser driverUser = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(booking.RideId));
                Bill bill = context.Bills.FirstOrDefault(c => c.Id.Equals(booking.BillId));
                Location Source = context.Locations.FirstOrDefault(c => c.Id.Equals(booking.BoardingPointId));
                Location Destination = context.Locations.FirstOrDefault(c => c.Id.Equals(booking.DropoffPointId));
                MatchResponseModel match = new MatchResponseModel(driverUser.Name, Source.Name, Destination.Name, Convert.ToString(ride.Date), ride.Time, ride.Id, bill.Amount, Convert.ToString(booking.BookingState));
                matches.Add(match);
            }
            return matches;
        }
        public List<MatchResponseModel> GetRequests(ApplicationUser user)
        {
            List<MatchResponseModel> matches = new List<MatchResponseModel>();
            Rider rider = context.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if(rider == null)
            {
                return matches;
            }
            List<RideRequest> requests = context.RideRequests.Where(c => c.RiderId.Equals(rider.Id)).ToList();
            foreach (RideRequest request in requests)
            {
                Driver driver = context.Drivers.FirstOrDefault(c => c.Id.Equals(request.DriverId));
                ApplicationUser driverUser = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(request.RideId));
                Location Source = context.Locations.FirstOrDefault(c => c.Id.Equals(request.BoardingPointId));
                Location Destination = context.Locations.FirstOrDefault(c => c.Id.Equals(request.DropoffPointId));
                MatchResponseModel match = new MatchResponseModel(driverUser.Name, Source.Name, Destination.Name, Convert.ToString(ride.Date), ride.Time, ride.Id, request.AmountInINr, Convert.ToString(request.RequestStatus));
                matches.Add(match);
            }
            return matches;
        }
    }
}
