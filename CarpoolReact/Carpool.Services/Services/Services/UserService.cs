using Carpool.Concerns;
using Carpool.Data;
using Carpool.Interfaces;
using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Services
{
    public class UserService : IUserService
    {
        private readonly CarpoolContext carpoolDb;
        private IHelperService HelperService;

        public UserService(CarpoolContext carpoolDb)
        {
            HelperService = new HelperService();
            this.carpoolDb = carpoolDb;
        }
        public User GetUser(ApplicationUser user )
        {
            User userResponse = new User()
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
            return userResponse;
        }
        public User Update(ApplicationUser user, User model)
        {
            user.Name = model.Name;
            user.PhoneNumber = model.PhoneNumber;
            user.Email = model.Email;
            user.UserName = model.Email;
            user.NormalizedEmail = model.Email.ToUpper();
            user.NormalizedUserName = model.Email.ToUpper();
            carpoolDb.ApplicationUsers.Update(user);
            carpoolDb.SaveChanges();
            User userResponse = new User()
            {
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email
            };
            return userResponse;
        }
    }
}