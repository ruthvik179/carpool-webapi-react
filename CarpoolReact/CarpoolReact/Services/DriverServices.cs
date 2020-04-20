using CarpoolReact.Models;
using CarpoolReact.ViewModels;
using Microsoft.AspNetCore.Mvc;
using CarpoolReact.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarpoolReact.Data;
using CarpoolReact.ResponseModels;

namespace CarpoolReact.Services
{
    public class DriverService : IDriverService
    {
        private readonly CarpoolContext context;
        private IHelperService HelperService { get; set; }

        public DriverService(CarpoolContext context)
        {
            HelperService = new HelperService();
            this.context = context;
        }

        public int CreateRide(OfferViewModel model, ApplicationUser user)
        {
            try
            {
                Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
                if (driver == null)
                {
                    return 401;
                }
                var rideId = HelperService.GenerateId("RID");
                model.Source.Type = Place.Source;
                model.Source.Id = HelperService.GenerateId("SOU");
                model.Source.RideId = rideId;
                model.Destination.Type = Place.Destination;
                model.Destination.Id = HelperService.GenerateId("DES");
                model.Destination.RideId = rideId;
                Ride ride = new Ride
                (
                rideId,
                driver.Id,
                Convert.ToDateTime(model.Date),
                model.Time,
                model.Source.Id,
                model.Destination.Id
                );
                foreach (Location loc in model.ViaPoints)
                {
                    loc.Id = HelperService.GenerateId("VIA");
                    loc.Type = Place.ViaPoint;
                    loc.RideId = ride.Id;
                    context.Locations.Add(loc);
                }
                context.Locations.Add(model.Source);
                context.Locations.Add(model.Destination);
                context.Rides.Add(ride);
                for (int i = 0; i < Convert.ToInt32(model.Seats); i++)
                {
                    Seat seat = new Seat(HelperService.GenerateId("SEA"),ride.Id);
                    context.Seats.Add(seat);
                }
                context.SaveChanges();
                return 200;
            }
            catch (Exception)
            {
                return 400;
            }
        }

        public int RegisterDriver(RegisterDriverViewModel model, ApplicationUser user)
        {
            try
            {
                Car car = new Car(model.RegistrationNo, model.CarManufacturer, model.CarModel, model.YearOfManufacture);
                Driver driver = new Driver(user.Id, user.Id, model.LicenseNo, car.RegistrationNumber);
                context.Cars.Add(car);
                context.Drivers.Add(driver);
                context.SaveChanges();
                return 200;
            }
            catch(Exception)
            {
                return 400;
            }
        }
        public int DeleteRide(string rideId, ApplicationUser user)
        {
            try
            {
                Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
                if (driver == null)
                {
                    return 400;
                }
                Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(rideId));
                if (ride == null)
                {
                    return 400;
                }
                context.Rides.Remove(ride);
                context.SaveChanges();
                return 200;
            }
            catch(Exception)
            {
                return 400;
            }
        }

        public List<MatchResponseModel> GetRides(ApplicationUser user)
        {
            Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            List<MatchResponseModel> matches = new List<MatchResponseModel>();
            if (driver == null)
            {
                return matches;
            }
            List<Ride> rides =  context.Rides.Where(c => c.DriverId.Equals(driver.Id)).ToList();
            foreach (Ride ride in rides)
            {
                List<Seat> seats = context.Seats.Where(c => c.RideId.Equals(ride.Id) && c.SeatState.Equals(SeatState.Free)).ToList();
                Location Source = context.Locations.FirstOrDefault(c => c.Id.Equals(ride.SourceId));
                Location Destination = context.Locations.FirstOrDefault(c => c.Id.Equals(ride.DestinationId));
                MatchResponseModel match = new MatchResponseModel(user.Name, Source.Name, Destination.Name, Convert.ToString(ride.Date), ride.Time, ride.Id, seats.Count);
                matches.Add(match);
            }
            return matches;
        }

        public int ConfirmBooking(ApplicationUser user, BookingViewModel model)
        {
            try
            {
                RideRequest rideRequest = context.RideRequests.FirstOrDefault(c => c.Id.Equals(model.Id));
                Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(rideRequest.RideId));
                Driver driver = context.Drivers.FirstOrDefault(c => c.Id.Equals(rideRequest.DriverId));
                Rider rider = context.Riders.FirstOrDefault(c => c.Id.Equals(rideRequest.RiderId));
                if (model.Accepted == true)
                {
                    Location Source = context.Locations.FirstOrDefault(c => c.Id.Equals(rideRequest.BoardingPointId));
                    Location Destination = context.Locations.FirstOrDefault(c => c.Id.Equals(rideRequest.DropoffPointId));
                    Bill bill = new Bill(HelperService.GenerateId("BIL"), rideRequest.DriverId, rideRequest.RiderId, rideRequest.AmountInINr);
                    context.Bills.Add(bill);
                    Booking booking = new Booking(HelperService.GenerateId("BOO"), ride.DriverId, rideRequest.RiderId, ride.Id, Source.Id, Destination.Id, bill.Id);
                    rideRequest.RequestStatus = RequestStatus.Accepted;
                    context.Bookings.Add(booking);
                }
                else
                {
                    rideRequest.RequestStatus = RequestStatus.Rejected;
                }
                context.RideRequests.Update(rideRequest);
                context.SaveChanges();
                return 200;
            }
            catch(Exception)
            {
                return 400;
            }
        }
        public int CancelBooking(ApplicationUser user, string bookingId)
        {
            Booking booking = context.Bookings.FirstOrDefault(c => c.Id.Equals(bookingId));
            booking.BookingState = BookingState.Cancelled;
            context.Bookings.Update(booking);
            context.SaveChanges();
            return 200;
        }
        public bool IsADriver(ApplicationUser user)
        {
            Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if (driver == null)
            {
                return false;
            }
            return true;
        }
        public object GetRideDetails(string rideId)
        {
            Ride ride = context.Rides.FirstOrDefault(c => c.Id.Equals(rideId));
            Driver driver = context.Drivers.FirstOrDefault(c => c.Id.Equals(ride.DriverId));
            ApplicationUser user = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
            if(ride == null)
            {
                return null;
            }
            Location source = context.Locations.FirstOrDefault(c => c.Id.Equals(ride.SourceId));
            Location destination = context.Locations.FirstOrDefault(c => c.Id.Equals(ride.DestinationId));
            List<Booking> bookings = context.Bookings.Where(c => c.RideId.Equals(rideId) && c.BookingState.Equals(BookingState.Ongoing)).ToList();
            List<RideRequest> requests = context.RideRequests.Where(c => c.RideId.Equals(rideId) && c.RequestStatus.Equals(RequestStatus.Pending)).ToList();
            List<Seat> seats = context.Seats.Where(c => c.RideId.Equals(rideId) && c.SeatState.Equals(SeatState.Free)).ToList();
            RideDetailsResponseModel model = new RideDetailsResponseModel(
                user.Name, 
                source.Name, 
                destination.Name, 
                ride.Time, 
                Convert.ToString(ride.Date), 
                seats.Count(), 
                bookings.Count(), 
                requests.Count() 
                );
            List<MatchResponseModel> bookingsResponse = new List<MatchResponseModel>();
            List<MatchResponseModel> requestsResponse = new List<MatchResponseModel>();
            foreach (Booking booking in bookings)
            {
                Location boardingPoint = context.Locations.FirstOrDefault(c => c.Id.Equals(booking.BoardingPointId));
                Location dropoffPoint = context.Locations.FirstOrDefault(c => c.Id.Equals(booking.DropoffPointId));
                Bill bill = context.Bills.FirstOrDefault(c => c.Id.Equals(booking.BillId));
                Rider rider = context.Riders.FirstOrDefault(c => c.Id.Equals(booking.RiderId));
                ApplicationUser userBooking = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(rider.ApplicationUserId));
                MatchResponseModel data = new MatchResponseModel(userBooking.Name, boardingPoint.Name, dropoffPoint.Name, booking.Id, bill.Amount);
                bookingsResponse.Add(data);
            }
            foreach (RideRequest request in requests)
            {
                Location boardingPoint = context.Locations.FirstOrDefault(c => c.Id.Equals(request.BoardingPointId));
                Location dropoffPoint = context.Locations.FirstOrDefault(c => c.Id.Equals(request.DropoffPointId));
                Rider rider = context.Riders.FirstOrDefault(c => c.Id.Equals(request.RiderId));
                ApplicationUser userBooking = context.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(rider.ApplicationUserId));
                MatchResponseModel data = new MatchResponseModel(userBooking.Name, boardingPoint.Name, dropoffPoint.Name, request.Id, request.AmountInINr);
                requestsResponse.Add(data);
            }
            return new { Ride = model, Bookings = bookingsResponse, Requests = requestsResponse };
        }
        [HttpPut]
        public object Update(ApplicationUser user, RegisterDriverViewModel model)
        {
            Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if(driver!=null)
            {
                driver.License = model.LicenseNo;
                Car carCheck = context.Cars.FirstOrDefault(c => c.RegistrationNumber.Equals(model.RegistrationNo));
                Car car = context.Cars.FirstOrDefault(c => c.RegistrationNumber.Equals(driver.CarRegistrationNumber));
                if (carCheck == null || carCheck == car)
                {
                    driver.CarRegistrationNumber = model.RegistrationNo;
                    car.RegistrationNumber = model.RegistrationNo;
                    car.Manufacturer = model.CarManufacturer;
                    car.Model = model.CarModel;
                    car.Year = model.YearOfManufacture;
                    context.Cars.Update(car);
                }
                else
                {
                    return new
                    {
                        error = "Car already registered by another User"
                    };
                }
            }
            else
            {
                Car car = new Car(model.RegistrationNo, model.CarManufacturer, model.CarModel, model.YearOfManufacture);
                driver = new Driver(user.Id, user.Id, model.LicenseNo, car.RegistrationNumber);
                context.Drivers.Add(driver);
                context.Cars.Add(car);
            }
            context.Drivers.Update(driver);
            context.SaveChanges();
            return new { code = 200 };
        }
    }

}
