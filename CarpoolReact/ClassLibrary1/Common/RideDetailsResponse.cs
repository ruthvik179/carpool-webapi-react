using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Concerns
{
    public class RideDetailsResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Time { get; set; }
        public string Date { get; set; }
        public int SeatCount { get; set; }
        public int BookingCount { get; set; }
        public int RequestCount { get; set; }
        public RideDetailsResponse(string id, string name, string source, string destination, string time, string date, int seatCount, int bookingCount, int requestCount)
        {
            this.Id = id;
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Time = time;
            this.Date = date;
            this.SeatCount = seatCount;
            this.BookingCount = bookingCount;
            this.RequestCount = requestCount;
        }
    }
}
