import { MatchDetails } from "../../Interfaces/Booking/MatchDetails";

export const FETCHED_MATCHES = "FETCHED_MATCHES";
export const FETCH_MATCHES_FAILURE = "FETCH_MATCHES_FAILURE";
export const RIDE_REQUESTED = "RIDE_REQUESTED";
export const RIDE_REQUEST_FAILURE = "RIDE_REQUEST_FAILURE";
export const ALERT_TIMEOUT = "ALERT_TIMEOUT";

export interface FetchedMatches {
    type : typeof FETCHED_MATCHES,
    payload : MatchDetails
}
export interface FetchMatchesFailure {
    type : typeof FETCH_MATCHES_FAILURE,
    payload : string
}
export interface RideRequested {
    type : typeof RIDE_REQUESTED,
    payload : string
}
export interface RideRequestFailed {
    type : typeof RIDE_REQUEST_FAILURE,
    payload : string
}
export interface AlertTimeout {
    type : typeof ALERT_TIMEOUT,
    payload : string
}