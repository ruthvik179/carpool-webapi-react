using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Carpool.Models
{
    public class Rider
    {
        public string ApplicationUserId { get; set; }
        [Key]
        public string Id { get; set; }
        public Rider()
        {

        }
        public Rider(string applicationUserId, string id)
        {
            this.ApplicationUserId = applicationUserId;
            this.Id = id;
        }
    }
}
