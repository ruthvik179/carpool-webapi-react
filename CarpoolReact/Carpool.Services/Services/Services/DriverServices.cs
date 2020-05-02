using Carpool.Models;
using Carpool.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Data;
using Carpool.Concerns;

namespace Carpool.Services
{
    public class DriverService : IDriverService
    {
        private readonly CarpoolContext carpoolDb;
        private IHelperService HelperService { get; set; }

        public DriverService(CarpoolContext carpoolDb)
        {
            HelperService = new HelperService();
            this.carpoolDb = carpoolDb;
        }

        public string CreateRide(OfferRequest model, ApplicationUser user)
        {
            try
            {
                Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
                if (driver == null)
                {
                    return "Driver not registered";
                }
                var rideId = HelperService.GenerateId("RID");
                List<string> vaiPointIds = new List<string>();
                AddLocation(model.Source);
                AddLocation(model.Destination);
                vaiPointIds.Add(model.Source.Id);
                foreach (Location loc in model.ViaPoints)
                {
                    AddLocation(loc);
                    vaiPointIds.Add(loc.Id);
                }
                vaiPointIds.Add(model.Destination.Id);
                Ride ride = new Ride
                (
                rideId,
                driver.Id,
                Convert.ToDateTime(model.Date),
                model.Time,
                model.Source.Id,
                model.Destination.Id,
                String.Join(",", vaiPointIds)
                );
                carpoolDb.Rides.Add(ride);
                List<Seat> seats = new List<Seat>();
                for (int j = 0; j < Convert.ToInt32(model.Seats); j++)
                {
                    Seat seat = new Seat(HelperService.GenerateId("SEA") + Convert.ToString(j), ride.Id);
                    seats.Add(seat);
                }
                carpoolDb.Seats.AddRange(seats);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string RegisterDriver(RegisterDriverRequest model, ApplicationUser user)
        {
            try
            {
                Car car = new Car(model.RegistrationNo, model.CarManufacturer, model.CarModel, model.YearOfManufacture);
                Driver driver = new Driver(user.Id, user.Id, model.LicenseNo, car.RegistrationNumber);
                carpoolDb.Cars.Add(car);
                carpoolDb.Drivers.Add(driver);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch (Exception e)
            {
                Car carCheck = carpoolDb.Cars.FirstOrDefault(c => c.RegistrationNumber.Equals(model.RegistrationNo));
                Driver driverCheck = carpoolDb.Drivers.FirstOrDefault(c => c.License.Equals(model.LicenseNo));
                if (carCheck != null)
                {
                    return "Car is already being used by another Account";
                }
                else if (driverCheck != null)
                {
                    return "License is already being used by another Account";
                }
                else
                {
                    return e.Message;
                }
            }
        }

        public List<MatchResponse> GetRides(ApplicationUser user)
        {
            Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            List<MatchResponse> matches = new List<MatchResponse>();
            if (driver == null)
            {
                return matches;
            }
            List<Ride> rides = carpoolDb.Rides.Where(c => c.DriverId.Equals(driver.Id) && c.RideState.Equals(RideState.Active)).ToList();
            foreach (Ride ride in rides)
            {
                List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(ride.Id) && c.State.Equals(SeatState.Free)).ToList();
                Location Source = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(ride.SourceId));
                Location Destination = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(ride.DestinationId));
                MatchResponse match = new MatchResponse()
                {
                    Name = user.Name,
                    Source = Source.Name,
                    Destination = Destination.Name,
                    Date = Convert.ToString(ride.Date),
                    Time = ride.Time,
                    Id = ride.Id,
                    SeatCount = seats.Count
                };
                matches.Add(match);
            }
            return matches;
        }

        public string ConfirmBooking(ApplicationUser user, BookingRequest model)
        {
            try
            {
                RideRequest rideRequest = carpoolDb.RideRequests.FirstOrDefault(c => c.Id.Equals(model.Id));
                Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(rideRequest.RideId));
                Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(rideRequest.DriverId));
                Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.Id.Equals(rideRequest.RiderId));
                if (model.Accepted)
                {
                    Location Source = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(rideRequest.BoardingPointId));
                    Location Destination = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(rideRequest.DropoffPointId));
                    Bill bill = new Bill(HelperService.GenerateId("BIL"), rideRequest.DriverId, rideRequest.RiderId, rideRequest.Amount, rideRequest.Amount * Constants.SGST, rideRequest.Amount * Constants.CGST);
                    carpoolDb.Bills.Add(bill);
                    Booking booking = new Booking(HelperService.GenerateId("BOO"), ride.DriverId, rideRequest.RiderId, ride.Id, Source.Id, Destination.Id, bill.Id);
                    List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(rideRequest.RideId) && c.State.Equals(SeatState.Free)).ToList();
                    if (seats == null)
                    {
                        return "Seats are full";
                    }
                    seats[0].State = SeatState.Booked;
                    seats[0].RiderId = rider.Id;
                    rideRequest.Status = RequestState.Accepted;
                    carpoolDb.Seats.UpdateRange(seats);
                    carpoolDb.Bookings.Add(booking);
                }
                else
                {
                    rideRequest.Status = RequestState.Rejected;
                }
                carpoolDb.RideRequests.Update(rideRequest);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public string CancelBooking(ApplicationUser user, string bookingId)
        {
            try
            {
                Booking booking = carpoolDb.Bookings.FirstOrDefault(c => c.Id.Equals(bookingId));
                List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(booking.RideId) && c.RiderId.Equals(booking.RiderId)).ToList();
                foreach (Seat seat in seats)
                {
                    seat.State = SeatState.Free;
                    seat.RiderId = null;
                }
                carpoolDb.Seats.UpdateRange(seats);
                booking.BookingState = BookingState.Cancelled;
                carpoolDb.Bookings.Update(booking);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }
        public bool IsADriver(ApplicationUser user)
        {
            Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            return driver != null;
        }
        public object GetRideDetails(string rideId)
        {
            Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(rideId));
            Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(ride.DriverId));
            ApplicationUser user = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
            if (ride != null)
            {
                Location source = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(ride.SourceId));
                Location destination = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(ride.DestinationId));
                List<Booking> bookings = carpoolDb.Bookings.Where(c => c.RideId.Equals(rideId) && c.BookingState.Equals(BookingState.Ongoing)).ToList();
                List<RideRequest> requests = carpoolDb.RideRequests.Where(c => c.RideId.Equals(rideId) && c.Status.Equals(RequestState.Pending)).ToList();
                List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(rideId) && c.State.Equals(SeatState.Free)).ToList();
                RideDetailsResponse model = new RideDetailsResponse(
                    ride.Id,
                    user.Name,
                    source.Name,
                    destination.Name,
                    ride.Time,
                    Convert.ToString(ride.Date),
                    seats.Count(),
                    bookings.Count(),
                    requests.Count()
                    );
                List<MatchResponse> bookingsResponse = new List<MatchResponse>();
                List<MatchResponse> requestsResponse = new List<MatchResponse>();
                foreach (Booking booking in bookings)
                {
                    Location boardingPoint = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(booking.BoardingPointId));
                    Location dropoffPoint = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(booking.DropOffPointId));
                    Bill bill = carpoolDb.Bills.FirstOrDefault(c => c.Id.Equals(booking.BillId));
                    Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.Id.Equals(booking.RiderId));
                    ApplicationUser userBooking = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(rider.ApplicationUserId));
                    MatchResponse data = new MatchResponse
                    {
                        Name = userBooking.Name,
                        Source = boardingPoint.Name,
                        Destination = dropoffPoint.Name,
                        Id = booking.Id,
                        Price = bill.Amount
                    };
                    bookingsResponse.Add(data);
                }
                foreach (RideRequest request in requests)
                {
                    Location boardingPoint = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(request.BoardingPointId));
                    Location dropoffPoint = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(request.DropoffPointId));
                    Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.Id.Equals(request.RiderId));
                    ApplicationUser userBooking = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(rider.ApplicationUserId));
                    MatchResponse data = new MatchResponse()
                    {
                        Name = userBooking.Name,
                        Source = boardingPoint.Name,
                        Destination = dropoffPoint.Name,
                        Id = request.Id,
                        Price = request.Amount
                    };
                    requestsResponse.Add(data);
                }
                return new { Ride = model, Bookings = bookingsResponse, Requests = requestsResponse };
            }
            return null;
        }
        public object Update(ApplicationUser user, RegisterDriverRequest model)
        {
            Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if(driver.CarRegistrationNumber == model.RegistrationNo)
            if (driver != null)
            {
                driver.License = model.LicenseNo;
                Car car = carpoolDb.Cars.FirstOrDefault(c => c.RegistrationNumber.Equals(driver.CarRegistrationNumber));
                if (car == null || driver.CarRegistrationNumber == model.RegistrationNo)
                {
                    driver.CarRegistrationNumber = model.RegistrationNo;
                    car.RegistrationNumber = model.RegistrationNo;
                    car.Manufacturer = model.CarManufacturer;
                    car.Model = model.CarModel;
                    car.Year = model.YearOfManufacture;
                    carpoolDb.Cars.Update(car);
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
                carpoolDb.Drivers.Add(driver);
                carpoolDb.Cars.Add(car);
            }
            carpoolDb.Drivers.Update(driver);
            carpoolDb.SaveChanges();
            return new { code = 200 };
        }
        public string CancelRide(string rideId)
        {
            try
            {
                List<Booking> bookings = carpoolDb.Bookings.Where(c => c.RideId.Equals(rideId) && c.BookingState.Equals(BookingState.Ongoing)).ToList();
                foreach (Booking booking in bookings)
                {
                    List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(booking.RideId) && c.RiderId.Equals(booking.RiderId)).ToList();
                    foreach (Seat seat in seats)
                    {
                        seat.State = SeatState.Free;
                        seat.RiderId = null;
                    }
                    carpoolDb.Seats.UpdateRange(seats);
                    booking.BookingState = BookingState.Cancelled;
                }
                carpoolDb.Bookings.UpdateRange(bookings);
                List<RideRequest> requests = carpoolDb.RideRequests.Where(c => c.RideId.Equals(rideId) && c.Status.Equals(RequestState.Pending)).ToList();
                foreach (RideRequest request in requests)
                {
                    request.Status = RequestState.Rejected;
                }
                carpoolDb.RideRequests.UpdateRange(requests);
                Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(rideId));
                ride.RideState = RideState.Cancelled;
                carpoolDb.Rides.Update(ride);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch(Exception)
            {
                return "BadRequest";
            }
        }

        public void AddLocation(Location loc)
        {
            Location location = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(loc.Id));
            if (location == null)
            {
                carpoolDb.Locations.Add(loc);
            }
        }
    }

}
