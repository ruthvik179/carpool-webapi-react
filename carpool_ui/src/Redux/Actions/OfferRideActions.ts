import * as actions from '../ActionTypes/OfferRideActionTypes'
export interface OfferState {
  alertType : string;
  alert : string;
}
export const OfferInitialState : OfferState = {
      alertType : '',
      alert : '',
}
export const offeredRide = (data: string) : actions.OfferedRide =>({
    type: actions.OFFERED_RIDE,
    payload:data,
});

export const offerRideFailed = (data: string) : actions.OfferRideFailed =>({
    type: actions.OFFER_RIDE_FAILURE,
    payload:data
});
export const alertTimeout = () : actions.AlertTimeout => ({
  type : actions.ALERT_TIMEOUT,
  payload : ""
});