using System;
using System.Collections.Generic;
using System.Text;

namespace CarpoolReact.Models
{
    public enum RequestStatus
    {
        Pending,
        Accepted,
        Rejected
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
    public enum Place
    {
        Source,
        Destination,
        ViaPoint
    }
}
