using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Concerns
{
    public class RegisterDriverRequest
    {
        public string LicenseNo { get; set; }
        public string RegistrationNo { get; set; }
        public string CarManufacturer { get; set; }
        public string CarModel { get; set; }
        public string YearOfManufacture { get; set; }
    }
}
