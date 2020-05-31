export const OFFERED_RIDE = "OFFERED_RIDES";
export const OFFER_RIDE_FAILURE = "OFFERED_RIDES_FAILURE";
export const ALERT_TIMEOUT = "ALERT_TIMEOUT";

export interface OfferedRide {
    type : typeof OFFERED_RIDE,
    payload : string
}
export interface OfferRideFailed {
    type : typeof OFFER_RIDE_FAILURE,
    payload : string
}
export interface AlertTimeout {
    type : typeof ALERT_TIMEOUT,
    payload : string
}