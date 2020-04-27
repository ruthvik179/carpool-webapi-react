using Carpool.Interfaces;
using System;
using System.Text.RegularExpressions;

namespace Carpool.Services
{
    public class HelperService : IHelperService
    {
        public bool IsPhoneNumberValid(string ph)
        {
            Match match = Regex.Match(ph, @"^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$");
            return match.Success;
        }
        public bool IsEmailValid(string email)
        {
            Match match = Regex.Match(email, @"^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\.)+[a-z]{2,5}$");
            return match.Success;
        }
        public string GenerateId(string id)
        {
            string Date = DateTime.Now.ToString("HHmmssyyyyMMdd");
            string Id = id + Date;
            return Id;
        }
    }
}