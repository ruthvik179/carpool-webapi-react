using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Models;
using Carpool.Concerns;

namespace Carpool.Interfaces
{
    public interface IUserService
    {
        public object GetDetails(ApplicationUser user);
        public int Update(ApplicationUser user, UserUpdateRequest model);
    }
}
