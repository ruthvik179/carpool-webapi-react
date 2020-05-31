using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Concerns
{
    public class MatchResponse
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Id { get; set; }
        public object Price { get; set; }
        public int SeatCount { get; set; }
        public string Status { get; set; }
        public double CancellationCharges { get; set; }
        public MatchResponse()
        {

        }
    }
}
