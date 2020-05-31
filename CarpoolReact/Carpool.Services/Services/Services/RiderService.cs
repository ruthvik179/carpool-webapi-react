using Carpool.Concerns;
using Carpool.Data;
using Carpool.Interfaces;
using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Services
{
    public class RiderService : IRiderService
    {
        private readonly CarpoolContext carpoolDb;
        private IHelperService HelperService { get; set; }

        public RiderService(CarpoolContext carpoolDb)
        {
            HelperService = new HelperService();
            this.carpoolDb = carpoolDb;
        }

        public List<MatchResponse> GetMatches(ApplicationUser user, MatchRequest model)
        {
            List<Ride> rides = new List<Ride>();
            List<MatchResponse> matches = new List<MatchResponse>();
            rides = carpoolDb.Rides.Where(c => c.Date.Equals(Convert.ToDateTime(model.Date)) && c.Time.Equals(model.Time) && c.RideState.Equals(RideState.Active)).ToList();
            foreach (Ride ride in rides)
            {
                string[] viaPointIds = ride.ViaPointIds.Split(',');
                for(int i=0; i< viaPointIds.Length; i++)
                {
                    if(viaPointIds[i] == model.Source.Id)
                    {
                        for (int j = i; j < viaPointIds.Length; j++)
                        {
                            if (viaPointIds[j] == model.Destination.Id)
                            {
                                List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(ride.Id) && c.State.Equals(SeatState.Free)).ToList();
                                if (seats.Count > 0)
                                {
                                    Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(ride.DriverId));
                                    Promotion promotion = carpoolDb.Promotions.FirstOrDefault(c => c.Id.Equals(driver.PromotionId));
                                    ApplicationUser userMatch = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                                    if (user != userMatch)
                                    {
                                        var amount = Math.Round(model.Distance * Constants.Price, 2, MidpointRounding.ToEven);
                                        var appDiscount = 0.0;
                                        if (model.Distance > Constants.MinimumDistance)
                                        {
                                            appDiscount = Constants.AppDiscount * amount;
                                        }
                                        var driverDiscount = 0.0;
                                        if (model.Distance > promotion.Distance)
                                        {
                                            driverDiscount = promotion.Discount * amount;
                                        }
                                        var cgst = (amount - driverDiscount - appDiscount) * Constants.CGST;
                                        var sgst = (amount - driverDiscount - appDiscount) * Constants.SGST;
                                        MatchResponse match = new MatchResponse()
                                        {
                                            Name = userMatch.Name,
                                            Source = model.Source.Name,
                                            Destination = model.Destination.Name,
                                            Date = model.Date,
                                            Time = ride.Time,
                                            Id = ride.Id,
                                            Price = new
                                            {
                                                Amount = amount,
                                                CGST = cgst,
                                                SGST = sgst,
                                                DriverDiscount = driverDiscount,
                                                AppDiscount = appDiscount,
                                                CancellationCharges = 0,
                                                Total = amount + cgst + sgst - driverDiscount - appDiscount
                                            },
                                            SeatCount = seats.Count,
                                        };
                                        matches.Add(match);
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            return matches;
        }

        public string RequestRide(ApplicationUser user, RideRquestModel model)
        {
            try
            {
                Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(model.RideId));
                Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
                Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(ride.DriverId));
                Promotion promotion = carpoolDb.Promotions.FirstOrDefault(c => c.Id.Equals(driver.PromotionId));
                if(rider == null)
                {
                    rider = new Rider(user.Id, user.Id);
                    carpoolDb.Riders.Add(rider);
                }
                var amount = Math.Round(model.Distance * Constants.Price, 2, MidpointRounding.ToEven);
                var driverDiscount = 0.0;
                if (model.Distance > promotion.Distance)
                {
                    driverDiscount = promotion.Discount * amount;
                }
                var appDiscount = 0.0;
                if (model.Distance > Constants.MinimumDistance)
                {
                    appDiscount = Constants.AppDiscount * amount;
                }
                var cgst = (amount - driverDiscount - appDiscount) * Constants.CGST;
                var sgst = (amount - driverDiscount - appDiscount) * Constants.SGST;
                Bill bill = new Bill(HelperService.GenerateId("BIL"), ride.DriverId, rider.Id, amount, sgst, cgst, driverDiscount, appDiscount);
                carpoolDb.Bills.Add(bill);
                RideRequest rideRequest = new RideRequest(
                HelperService.GenerateId("REQ"),
                model.RideId,
                rider.Id,
                ride.DriverId,
                model.Source.Id,
                model.Destination.Id,
                bill.Id
                );
                carpoolDb.RideRequests.Add(rideRequest);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch (Exception)
            {
                return "Ride could not be offered";
            }
        }

        public List<MatchResponse> GetBookings(ApplicationUser user)
        {
            List<MatchResponse> matches = new List<MatchResponse>();
            Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if (rider == null)
            {
                return matches;
            }
            List<Booking> Bookings = carpoolDb.Bookings.Where(c => c.RiderId.Equals(rider.Id)).ToList();
            foreach (Booking booking in Bookings)
            {
                Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(booking.DriverId));
                ApplicationUser driverUser = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(booking.RideId));
                Bill bill = carpoolDb.Bills.FirstOrDefault(c => c.Id.Equals(booking.BillId));
                Location Source = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(booking.BoardingPointId));
                Location Destination = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(booking.DropOffPointId));
                MatchResponse match = new MatchResponse()
                {
                    Name = driverUser.Name,
                    Source = Source.Name,
                    Destination = Destination.Name,
                    Date = Convert.ToString(ride.Date),
                    Time = ride.Time,
                    Id = booking.Id,
                    Price = new
                    {
                        Amount = bill.Amount,
                        CGST = bill.CGST,
                        SGST = bill.SGST,
                        DriverDiscount = bill.DriverDiscount,
                        AppDiscount = bill.AppDiscount,
                        Total = bill.TotalAmount()
                    },
                    CancellationCharges = booking.CancellationCharges,
                    Status = Convert.ToString(booking.BookingState),
                };
                matches.Add(match);
            }
            return matches;
        }
        public List<MatchResponse> GetRequests(ApplicationUser user)
        {
            List<MatchResponse> matches = new List<MatchResponse>();
            Rider rider = carpoolDb.Riders.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            if(rider == null)
            {
                return matches;
            }
            List<RideRequest> requests = carpoolDb.RideRequests.Where(c => c.RiderId.Equals(rider.Id)).ToList();
            foreach (RideRequest request in requests)
            {
                Driver driver = carpoolDb.Drivers.FirstOrDefault(c => c.Id.Equals(request.DriverId));
                ApplicationUser driverUser = carpoolDb.ApplicationUsers.FirstOrDefault(c => c.Id.Equals(driver.ApplicationUserId));
                Ride ride = carpoolDb.Rides.FirstOrDefault(c => c.Id.Equals(request.RideId));
                Bill bill = carpoolDb.Bills.FirstOrDefault(c => c.Id.Equals(request.BillId));
                Location Source = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(request.BoardingPointId));
                Location Destination = carpoolDb.Locations.FirstOrDefault(c => c.Id.Equals(request.DropoffPointId));
                MatchResponse match = new MatchResponse()
                {
                    Name = driverUser.Name,
                    Source = Source.Name,
                    Destination = Destination.Name,
                    Date = Convert.ToString(ride.Date),
                    Time = ride.Time,
                    Id = request.Id,
                    Price = new
                    {
                        Amount = bill.Amount,
                        CGST = bill.CGST,
                        SGST = bill.SGST,
                        DriverDiscount = bill.DriverDiscount,
                        AppDiscount = bill.AppDiscount,
                        Total = bill.TotalAmount()
                    },
                    Status = Convert.ToString(request.Status)
                };
                matches.Add(match);
            }
            return matches;
        }
        public string CancelBooking(ApplicationUser user, string bookingId)
        {
            try
            {
                Booking booking = carpoolDb.Bookings.FirstOrDefault(c => c.Id.Equals(bookingId));
                if(booking == null)
                {
                    return "Booking does not exist";
                }
                List<Seat> seats = carpoolDb.Seats.Where(c => c.RideId.Equals(booking.RideId) && c.RiderId.Equals(booking.RiderId)).ToList();
                foreach (Seat seat in seats)
                {
                    seat.State = SeatState.Free;
                    seat.RiderId = null;
                }
                carpoolDb.Seats.UpdateRange(seats);
                Bill bill = carpoolDb.Bills.FirstOrDefault(c => c.Id.Equals(booking.BillId));
                double charge = Constants.CancellationCharge;
                double cancellationCharges = Math.Round(charge* bill.Amount, 2, MidpointRounding.ToEven);
                booking.BookingState = BookingState.Cancelled;
                booking.CancellationCharges = cancellationCharges;
                carpoolDb.Bookings.Update(booking);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }
        public string CancelRequest(ApplicationUser user, string requestId)
        {
            try
            {
                RideRequest request = carpoolDb.RideRequests.FirstOrDefault(c => c.Id.Equals(requestId));
                if (request == null)
                {
                    return "Booking does not exist";
                }
                request.Status = RequestState.Cancelled;
                carpoolDb.RideRequests.Update(request);
                carpoolDb.SaveChanges();
                return "Ok";
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }
    }
}
