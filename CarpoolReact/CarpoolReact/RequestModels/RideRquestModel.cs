using CarpoolReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.ViewModels
{
    public class RideRquestModel
    {
        public Location Source { get; set; }
        public Location Destination { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string RideId { get; set; }
        public double Distance { get; set; }
    }
}
