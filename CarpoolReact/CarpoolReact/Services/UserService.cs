using CarpoolReact.Data;
using CarpoolReact.Interfaces;
using CarpoolReact.Models;
using CarpoolReact.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.Services
{
    public class UserService : IUserService
    {
        private readonly CarpoolContext context;
        private IHelperService HelperService { get; set; }
        private IDriverService driverService { get; set; }

        public UserService(CarpoolContext context)
        {
            HelperService = new HelperService();
            this.context = context;
        }
        public object GetDetails(ApplicationUser user)
        {
            Driver driver = context.Drivers.FirstOrDefault(c => c.ApplicationUserId.Equals(user.Id));
            Car car;
             if(driver == null) 
            {
                driver = new Driver();
                driver.License = "";
                car = new Car("","","",""); 
            }
            else
            {
                car = context.Cars.FirstOrDefault(c => c.RegistrationNumber.Equals(driver.CarRegistrationNumber));
            }
            return new 
            { 
                name = user.Name,
                phoneNumber = user.PhoneNumber,
                email = user.Email,
                license = driver.License,
                registrationNumber = car.RegistrationNumber,
                carManufacturer = car.Manufacturer,
                carModel = car.Model,
                carYearOfManufacture = car.Year
            };
        }
        public int Update(ApplicationUser user, UserUpdateModel model)
        {
            user.Name = model.Name;
            user.PhoneNumber = model.PhoneNumber;
            user.Email = model.Email;
            user.UserName = model.Email;
            user.NormalizedEmail = model.Email.ToUpper();
            user.NormalizedUserName = model.Email.ToUpper();
            context.ApplicationUsers.Update(user);
            context.SaveChanges();
            return 200;
        }
    }
}