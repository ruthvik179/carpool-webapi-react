using CarpoolReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.ViewModels
{
    public class OfferRequest
    {
        public Location Source { get; set; }
        public Location Destination { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public List<Location> ViaPoints { get; set; }
        public string Seats { get; set; }

        public OfferRequest()
        {
            ViaPoints = new List<Location>();
        }
    }
}

