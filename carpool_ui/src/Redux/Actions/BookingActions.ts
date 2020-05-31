import * as actions from '../ActionTypes/BookingActionTypes'
import { Place } from '../../Interfaces/Booking/Place';
import { RideMatch } from '../../Interfaces/Booking/RideMatch';
import { MatchDetails } from '../../Interfaces/Booking/MatchDetails';
export interface RideMatches extends Array<RideMatch>{}
export interface BookingState {
  submittedSource : Place,
  submittedDestination : Place,
  submittedDate : string;
  submittedTime : string;
  searchResults : RideMatches;
  error : string;
  distance : number;
  alertType : string;
  alert : string;
  success : boolean;
}
export const BookingInitialState : BookingState = {
    submittedSource: {
        name: "",
        lat: 0,
        lng: 0,
        id : ""
      },
      submittedDestination: {
        name: "",
        lat: 0,
        lng: 0,
        id : ""
      },
      submittedDate: "",
      submittedTime: "",
      searchResults : [],
      error : "",
      distance : 0,
      alertType : '',
      alert : '',
      success : false
}
export const matchesFetched = (data: MatchDetails) : actions.FetchedMatches =>({
    type: actions.FETCHED_MATCHES,
    payload:data,
});

export const matchesFetchFailed = (data: string) : actions.FetchMatchesFailure =>({
    type: actions.FETCH_MATCHES_FAILURE,
    payload:data
});

export const rideRequested = (data : string) : actions.RideRequested => ({
  type : actions.RIDE_REQUESTED,
  payload : data
})
export const rideRequestFailed = (data : string) : actions.RideRequestFailed => ({
  type : actions.RIDE_REQUEST_FAILURE,
  payload : data
})
export const alertTimeout = () : actions.AlertTimeout => ({
  type : actions.ALERT_TIMEOUT,
  payload : ""
});