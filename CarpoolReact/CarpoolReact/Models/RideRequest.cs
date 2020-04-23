using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarpoolReact.Models
{
    public class RideRequest
    {
        [Key]
        public string Id { get; set; }
        public string RideId { get; set; }
        public string RiderId { get; set; }
        public string DriverId { get; set; }
        public RequestState RequestStatus { get; set; }
        public string BoardingPointId { get; set; }
        public string DropoffPointId { get; set; }
        public double AmountInINr { get; set; }
        public RideRequest()
        {

        }
        public RideRequest(string id, string rideId, string riderId, string driverId, string boardingPointId, string dropoffPointId, double amountInInr)
        {
            this.Id = id;
            this.RideId = rideId;
            this.RiderId = riderId;
            this.DriverId = driverId;
            this.RequestStatus = RequestState.Pending;
            this.BoardingPointId = boardingPointId;
            this.DropoffPointId = dropoffPointId;
            this.AmountInINr = amountInInr;
        }

    }
}
