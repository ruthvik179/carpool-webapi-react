import { RideValues } from "../../Component/ViewRides/ViewRides";
import { OpenedRide } from "../../Interfaces/ViewRides/OpenedRide";

export const FETCHED_OFFER_RIDES = "FETCHED_OFFER_RIDES";
export const FETCH_OFFER_RIDES_FAILURE = "FETCH_OFFER_RIDES_FAILURE";
export const FETCHED_BOOKED_RIDES = "FETCHED_BOOKED_RIDES";
export const FETCH_BOOKED_RIDES_FAILURE = "FETCH_BOOKED_RIDES_FAILURE";
export const FETCHED_REQUESTED_RIDES = "FETCHED_REQUESTED_RIDES";
export const FETCH_REQUESTED_RIDES_FAILURE = "FETCH_REQUESTED_RIDES_FAILURE";
export const FETCHED_OPENED_RIDE = "FETCHED_OPENED_RIDE_DETAILS";
export const FETCH_OPENED_RIDE_FAILURE = "FETCH_OPENED_RIDE_DETAILS_FAILURE ";
export const ACCEPTED_RIDE = "ACCEPTED_RIDE";
export const ACCEPT_RIDE_FAILURE= "ACCEPT_RIDE_FAILURE";
export const CANCEL_RIDE = "CANCEL_RIDE";
export const CANCEL_RIDE_FAILURE = "CANCEL_RIDE_FAILURE";
export const CANCEL_BOOKING_RIDER = "CANCEL_BOOKING";
export const CANCEL_BOOKING_RIDER_FAILURE = "CANCEL_BOOKING_FAILURE";
export const CANCEL_BOOKING_DRIVER = "CANCEL_BOOKING";
export const CANCEL_BOOKING_DRIVER_FAILURE = "CANCEL_BOOKING_FAILURE";
export const CANCEL_RIDE_REQUEST_RIDER = "CANCEL_RIDE_REQUEST";
export const CANCEL_RIDE_REQUEST_RIDER_FAILURE = "CANCEL_RIDE_REQUEST_FAILURE";
export const CANCEL_RIDE_REQUEST_DRIVER = "CANCEL_RIDE_REQUEST";
export const CANCEL_RIDE_REQUEST_DRIVER_FAILURE = "CANCEL_RIDE_REQUEST_FAILURE";
export const ALERT_TIMEOUT = "ALERT_TIMEOUT";

export interface FetchedOfferRides {
    type : typeof FETCHED_OFFER_RIDES,
    payload : RideValues
}
export interface FetchOfferRidesFailed {
    type : typeof FETCH_OFFER_RIDES_FAILURE,
    payload : string
}
export interface FetchedBookedRides {
    type : typeof FETCHED_BOOKED_RIDES,
    payload : RideValues
}
export interface FetchBookedRidesFailed {
    type : typeof FETCH_BOOKED_RIDES_FAILURE,
    payload : string
}
export interface FetchedRequestedRides {
    type : typeof FETCHED_REQUESTED_RIDES,
    payload : RideValues
}
export interface FetchRequestedRidesFailed {
    type : typeof FETCH_REQUESTED_RIDES_FAILURE,
    payload : string
}
export interface FetchedOpenedRide {
    type : typeof FETCHED_OPENED_RIDE,
    payload : OpenedRide
}
export interface FetchOpenedRideFailed {
    type : typeof FETCH_OPENED_RIDE_FAILURE,
    payload : string
}
export interface RideAccepted {
    type : typeof ACCEPTED_RIDE,
    payload : string
}
export interface RideAcceptFailed {
    type : typeof ACCEPT_RIDE_FAILURE,
    payload : string
}
export interface RideCancelled {
    type : typeof CANCEL_RIDE,
    payload : string
}
export interface RideCancelFailed {
    type : typeof CANCEL_RIDE_FAILURE,
    payload : string
}
export interface BookingCancelledRider {
    type : typeof CANCEL_BOOKING_RIDER,
    payload : string
}
export interface BookingCancelledDriver {
    type : typeof CANCEL_BOOKING_RIDER,
    payload : string
}
export interface BookingCancelRiderFailed {
    type : typeof CANCEL_BOOKING_RIDER_FAILURE,
    payload : string
}
export interface BookingCancelDriverFailed {
    type : typeof CANCEL_BOOKING_RIDER_FAILURE,
    payload : string
}
export interface RideRequestCancelledRider {
    type : typeof CANCEL_RIDE_REQUEST_RIDER,
    payload : string
}
export interface RideRequestCancelledDriver {
    type : typeof CANCEL_RIDE_REQUEST_RIDER,
    payload : string
}
export interface RideRequestCancelRiderFailed {
    type : typeof CANCEL_RIDE_REQUEST_RIDER_FAILURE,
    payload : string
}
export interface RideRequestCancelDriverFailed {
    type : typeof CANCEL_RIDE_REQUEST_RIDER_FAILURE,
    payload : string
}
export interface AlertTimeout {
    type : typeof ALERT_TIMEOUT,
    payload : string
}