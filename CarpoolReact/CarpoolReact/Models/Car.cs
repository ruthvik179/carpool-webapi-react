using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace CarpoolReact.Models
{
    public class Car
    {
        [Key]
        public string RegistrationNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public Car()
        {

        }
        public Car(string registrationNumber, string manufacturer, string model, string year)
        {
            this.RegistrationNumber = registrationNumber;
            this.Manufacturer = manufacturer;
            this.Model = model;
            this.Year = year;
        }

    }
}
