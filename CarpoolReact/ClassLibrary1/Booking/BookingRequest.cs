using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Concerns
{
    public class BookingRequest
    {
        public bool Accepted { get; set; }
        public string Id { get; set; }
    }
}
