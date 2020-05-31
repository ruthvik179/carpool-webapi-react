export class Urls{
    readonly MainUrl = "https://localhost:44347/api";
    readonly AuthController = this.MainUrl + "/auth";
    readonly DriverController = this.MainUrl + "/driver";
    readonly RiderController = this.MainUrl + "/rider";
    readonly UserController = this.MainUrl + "/user";
    readonly GetRideMatches = this.RiderController + "/getridematches";
    readonly RequestRide = this.RiderController + "/requestride";
    readonly GetDriverDetails = this.DriverController + "/getdetails";
    readonly GetPromotions = this.DriverController + "/getpromotions";
    readonly UpdatePromotions = this.DriverController + "/updatepromotion";
    readonly UserUpdate = this.UserController + "/update";
    readonly DriverUpdate = this.DriverController + "/update";
    readonly IsADriver = this.DriverController + "/isadriver";
    readonly Login = this.AuthController + "/login";
    readonly RegisterUser = this.AuthController + "/register";
    readonly CreateRide = this.DriverController + "/createride";
    readonly RegisterDriver = this.DriverController + "/registerdriver";
    readonly GetOfferRides = this.DriverController + "/getrides";
    readonly GetRideRequests = this.RiderController + "/getrequests";
    readonly GetBookings = this.RiderController + "/getbookings";
    readonly CancelRide = this.DriverController + "/cancelride";
    readonly CancelRequest = this.RiderController + "/cancelrequest";
    readonly CancelBookingRider = this.RiderController + "/cancelbooking";
    readonly GetRideDetails = this.DriverController + "/getridedetails?rideId=";
    readonly CancelBookingDriver = this.DriverController + "/cancelbooking";
    readonly ConfirmBooking = this.DriverController + "/confirmbooking";
    readonly GetUser = this.UserController + "/getuser";
}