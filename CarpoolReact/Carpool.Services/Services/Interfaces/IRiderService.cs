using Carpool.Concerns;
using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpool.Interfaces
{
    public interface IRiderService
    {
        public List<MatchResponse> GetMatches(ApplicationUser user, MatchRequest model);
        public string RequestRide(ApplicationUser user, RideRquestModel model);
        public List<MatchResponse> GetRequests(ApplicationUser user);
        public List<MatchResponse> GetBookings(ApplicationUser user);
        public string CancelBooking(ApplicationUser user, string bookingId);
        public string CancelRequest(ApplicationUser user, string requestId);
    }
}
