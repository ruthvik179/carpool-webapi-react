using CarpoolReact.Models;
using CarpoolReact.ResponseModels;
using CarpoolReact.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolReact.Interfaces
{
    public interface IRiderService
    {
        public List<MatchResponseModel> GetMatches(MatchViewModel model);
        public int RequestRide(ApplicationUser user, RequestViewModel model);
        public List<MatchResponseModel> GetRequests(ApplicationUser user);
        public List<MatchResponseModel> GetBookings(ApplicationUser user);
    }
}
