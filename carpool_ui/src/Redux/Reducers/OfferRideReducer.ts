import { OfferInitialState, OfferState } from "../Actions/OfferRideActions"
import * as actions from '../ActionTypes/OfferRideActionTypes'

export const OfferReducer = (state=OfferInitialState, action: { type: any; payload: any; }) : OfferState=>{
    // console.log(action)
    switch(action.type){
        case actions.OFFERED_RIDE:
            return{
                alertType : "success",
                alert : action.payload
            }
        case actions.OFFER_RIDE_FAILURE:
            return{
                alertType : "warning",
                alert : action.payload
            }
        case actions.ALERT_TIMEOUT :
            return {
                alertType : "",
                alert : ""
            }
        default :
            return state
    }
}