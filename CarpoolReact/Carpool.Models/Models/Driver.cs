using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Carpool.Models
{
    public class Driver
    {
        public string ApplicationUserId { get; set; }
        [Key]
        public string Id { get; set; }
        public string License { get; set; }
        public string CarRegistrationNumber { get; set; }
        public string PromotionId { get; set; }
        public Driver()
        {

        }
    }
}
