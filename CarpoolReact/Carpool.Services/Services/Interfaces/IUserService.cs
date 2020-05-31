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
        public User Update(ApplicationUser user, User model);
        public User GetUser(ApplicationUser user);
    }
}
