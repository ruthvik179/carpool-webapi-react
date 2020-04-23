using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarpoolReact.Models;
using CarpoolReact.ViewModels;

namespace CarpoolReact.Interfaces
{
    public interface IUserService
    {
        public object GetDetails(ApplicationUser user);
        public int Update(ApplicationUser user, UserUpdateRequest model);
    }
}
