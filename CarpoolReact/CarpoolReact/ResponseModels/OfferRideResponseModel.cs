using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.ResponseModels
{
    public class OfferRideResponseModel
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string RideId { get; set; }
        public int SeatCount { get; set; }

        public OfferRideResponseModel(string name, string source, string destination, string date, string time, string rideId, int seatCount)
        {
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Date = date;
            this.Time = time;
            this.RideId = rideId;
            this.SeatCount = seatCount;
        }
    }
}
