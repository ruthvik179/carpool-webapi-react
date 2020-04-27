using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Carpool.Models
{
    public class Booking
    {
        [Key]
        public string Id { get; set; }
        public string DriverId { get; set; }
        public string RiderId { get; set; }
        public string RideId { get; set; }
        public string BillId { get; set; }
        public BookingState BookingState { get; set; }
        public string BoardingPointId { get; set; }
        public string DropOffPointId { get; set; }
        public double CancellationCharges { get; set; }
        public Booking()
        {

        }
        public Booking(string id, string driverId, string riderId, string rideId, string boardingPointId, string dropoffPointId, string billId)
        {
            this.Id = id;
            this.DriverId = driverId;
            this.RiderId = riderId;
            this.RideId = rideId;
            this.BoardingPointId = boardingPointId;
            this.DropOffPointId = dropoffPointId;
            this.BookingState = BookingState.Ongoing;
            this.BillId = billId;
            this.CancellationCharges = 0;
        }

    }
}
