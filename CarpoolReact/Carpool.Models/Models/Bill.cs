using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Models
{
    public class Bill
    {
        [Key]
        public string Id { get; set; }
        public string DriverId { get; set; }
        public string RiderId { get; set; }
        public double Amount { get; set; }
        public double SGST { get; set; }
        public double CGST { get; set; }
        public Bill()
        {

        }
        public Bill(string id, string driverId, string riderId, double amount, double sgst, double cgst)
        {
            this.Id = id;
            this.DriverId = driverId;
            this.RiderId = riderId;
            this.Amount = amount;
            this.SGST = sgst;
            this.CGST = cgst;
        }
    }
}
