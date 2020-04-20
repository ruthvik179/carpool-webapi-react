using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.ResponseModels
{
    public class MatchResponseModel
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Id { get; set; }
        public double Price { get; set; }
        public int SeatCount { get; set; }
        public string Status { get; set; }
        public MatchResponseModel(string name, string source, string destination, string date, string time, string id, double price, int seatCount)
        {
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Date = date;
            this.Time = time;
            this.Id = id;
            this.Price = price;
            this.SeatCount = seatCount;
        }
        public MatchResponseModel(string name, string source, string destination, string date, string time, string id, double price, string status)
        {
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Date = date;
            this.Time = time;
            this.Id = id;
            this.Price = price;
            this.Status = status;
        }
        public MatchResponseModel(string name, string source, string destination, string date, string time, string id, int seatCount)
        {
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Date = date;
            this.Time = time;
            this.Id = id;
            this.SeatCount = seatCount;
        }
        public MatchResponseModel(string name, string source, string destination, string id, double price)
        {
            this.Name = name;
            this.Source = source;
            this.Destination = destination;
            this.Id = id;
            this.Price = price;
        }
    }
}
