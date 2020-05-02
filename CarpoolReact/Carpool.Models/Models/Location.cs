using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Carpool.Models
{
    public class Location
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Location(string id, string name, double lattitude, double longitude)
        {
            this.Id = id;
            this.Name = name;
            this.Latitude = lattitude;
            this.Longitude = longitude;
        }
        public Location()
        {

        }
    }
}
