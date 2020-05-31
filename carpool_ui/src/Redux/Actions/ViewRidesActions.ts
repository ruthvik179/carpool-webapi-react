import { RideDetails } from '../../Interfaces/ViewRides/RideDetails';
import { RideValue } from '../../Interfaces/ViewRides/RideValue';
import { BookingRequest } from '../../Interfaces/ViewRides/BookingRequest';
import * as actions from '../ActionTypes/ViewRideActionTypes'
import { OpenedRide } from '../../Interfaces/ViewRides/OpenedRide';
export interface BookingsRequests extends Array<BookingRequest> { }
export interface RideValues extends Array<RideValue> { }
export interface ViewRidesState {
    OfferRides : RideValues;
    BookedRides : RideValues;
    RideRequests : RideValues;
    bookings : BookingsRequests;
    requests : BookingsRequests;
    ride : RideDetails;
    alert : string;
    alertType : string;
}
export const ViewRidesInitialState : ViewRidesState = {
    OfferRides : [],
    BookedRides : [],
    RideRequests : [],
    bookings: [],
    requests: [],
    ride : {
      id : "",
      name : "",
      source : "",
      destination : "",
      time : "",
      date : "",
      seatCount : 0,
      bookingCount: 0,  
      requestCount: 0,  
    },
    alertType : "",
    alert : "",
}
export const offerRidesFetched = (data : RideValues) : actions.FetchedOfferRides=> ({
    type : actions.FETCHED_OFFER_RIDES,
    payload : data
});
export const offerRidesFetchFailed = (data : string) : actions.FetchOfferRidesFailed => ({
    type : actions.FETCH_OFFER_RIDES_FAILURE,
    payload : data
});
export const bookedRidesFetched = (data : RideValues) : actions.FetchedBookedRides => ({
    type : actions.FETCHED_BOOKED_RIDES,
    payload : data
});
export const bookedRidesFetchFailed = (data : string) : actions.FetchBookedRidesFailed => ({
    type : actions.FETCH_BOOKED_RIDES_FAILURE,
    payload : data
});
export const requestedRidesFetched = (data : RideValues) : actions.FetchedRequestedRides => ({
    type : actions.FETCHED_REQUESTED_RIDES,
    payload : data
});
export const requestedRidesFetchFailed = (data : string) : actions.FetchRequestedRidesFailed => ({
    type : actions.FETCH_REQUESTED_RIDES_FAILURE,
    payload : data
});
export const openedRideFetched = (data : OpenedRide) : actions.FetchedOpenedRide => ({
    type : actions.FETCHED_OPENED_RIDE,
    payload : data
})
export const openedRideFetchFailed = (data : string) : actions.FetchOpenedRideFailed => ({
    type : actions.FETCH_OPENED_RIDE_FAILURE,
    payload : data
});
export const acceptedRide = (data : string) : actions.RideAccepted => ({
    type : actions.ACCEPTED_RIDE,
    payload : data
})
export const acceptRideFaied = (data : string) : actions.RideAcceptFailed => ({
    type : actions.ACCEPT_RIDE_FAILURE,
    payload : data
})
export const cancelledRide = (data : string) : actions.RideCancelled => ({
    type : actions.CANCEL_RIDE,
    payload : data
})
export const cancelRideFailed = (data : string) : actions.RideCancelFailed => ({
    type : actions.CANCEL_RIDE_FAILURE,
    payload : data
})
export const cancelledBookingRider = (data : string) : actions.BookingCancelledRider => ({
    type : actions.CANCEL_BOOKING_RIDER,
    payload : data
})
export const cancelBookingRiderFailed = (data : string) : actions.BookingCancelRiderFailed => ({
    type : actions.CANCEL_BOOKING_RIDER_FAILURE,
    payload : data
})
export const cancelledRideRequestRider = (data : string) : actions.RideRequestCancelledRider => ({
    type : actions.CANCEL_RIDE_REQUEST_RIDER,
    payload : data
})
export const cancelRideRequestRiderFailed = (data : string) : actions.RideRequestCancelRiderFailed => ({
    type : actions.CANCEL_RIDE_REQUEST_RIDER_FAILURE,
    payload : data
})
export const cancelledBookingDriver = (data : string) : actions.BookingCancelledDriver => ({
    type : actions.CANCEL_BOOKING_DRIVER,
    payload : data
})
export const cancelBookingDriverFailed = (data : string) : actions.BookingCancelDriverFailed => ({
    type : actions.CANCEL_BOOKING_DRIVER_FAILURE,
    payload : data
})
export const cancelledRideRequestDriver = (data : string) : actions.RideRequestCancelledDriver => ({
    type : actions.CANCEL_RIDE_REQUEST_DRIVER,
    payload : data
})
export const cancelRideRequestDriverFailed = (data : string) : actions.RideRequestCancelDriverFailed => ({
    type : actions.CANCEL_RIDE_REQUEST_DRIVER_FAILURE,
    payload : data
})
export const alertTimeout = () : actions.AlertTimeout => ({
    type : actions.ALERT_TIMEOUT,
    payload : ""
})