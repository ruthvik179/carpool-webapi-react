using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Carpool.Models
{
    public class Ride
    {
        [Key]
        public string Id { get; set; }
        public string DriverId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string SourceId { get; set; }
        public string DestinationId { get; set; }
        public string ViaPointIds { get; set; }
        public RideState RideState { get; set; }
        public Ride()
        {

        }
        public Ride(string id, string driverID, DateTime date, string time, string sourceId, string destinationId, string viaPointIds)
        {
            this.Id = id;
            this.DriverId = driverID;
            this.Date = date;
            this.Time = time;
            this.SourceId = sourceId;
            this.DestinationId = destinationId;
            this.ViaPointIds = viaPointIds;
            this.RideState = RideState.Active;
        }
    }
}
