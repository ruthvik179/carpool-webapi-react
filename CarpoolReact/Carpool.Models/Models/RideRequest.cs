using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Models
{
    public class RideRequest
    {
        [Key]
        public string Id { get; set; }
        public string RideId { get; set; }
        public string RiderId { get; set; }
        public string DriverId { get; set; }
        public RequestState Status { get; set; }
        public string BoardingPointId { get; set; }
        public string DropoffPointId { get; set; }
        public string BillId { get; set; }
        public RideRequest()
        {

        }
        public RideRequest(string id, string rideId, string riderId, string driverId, string boardingPointId, string dropoffPointId, string billId)
        {
            this.Id = id;
            this.RideId = rideId;
            this.RiderId = riderId;
            this.DriverId = driverId;
            this.Status = RequestState.Pending;
            this.BoardingPointId = boardingPointId;
            this.DropoffPointId = dropoffPointId;
            this.BillId = billId;
        }

    }
}
