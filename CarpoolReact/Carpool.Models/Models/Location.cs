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
        public LocationType Type { get; set; }
        public string RideId { get; set; }
        public Location(string id, string name, double lattitude, double longitude, float distance, LocationType type, string rideId)
        {
            this.Id = id;
            this.Name = name;
            this.Latitude = lattitude;
            this.Longitude = longitude;
            this.Type = type;
            this.RideId = rideId;
        }
        public Location()
        {

        }
    }
}
