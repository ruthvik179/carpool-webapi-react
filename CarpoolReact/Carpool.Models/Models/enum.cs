using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Models
{
    public enum RequestState
    {
        Pending,
        Accepted,
        Rejected,
        Cancelled
    }

    public enum SeatState
    {
        Booked,
        Free
    }

    public enum BookingState
    {
        Ongoing,
        Completed,
        Cancelled
    }
    public enum RideState
    {
        Active,
        Cancelled
    }
    public enum LocationType
    {
        Source,
        Destination,
        ViaPoint
    }
}
