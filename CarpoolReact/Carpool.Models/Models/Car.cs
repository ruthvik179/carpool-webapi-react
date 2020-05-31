using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Carpool.Models
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

    }
}
