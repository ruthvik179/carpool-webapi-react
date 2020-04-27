using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Models
{
    public class Seat
    {
        [Key]
        public string Id { get; set; }
        public SeatState State { get; set; }
        public string RiderId { get; set; }
        public string RideId { get; set; }
        public Seat(string id, string rideId)
        {
            this.Id = id;
            this.RideId = rideId;
            State = SeatState.Free;
            RiderId = null;
        }
    }
}
