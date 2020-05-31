import { ViewRidesInitialState, ViewRidesState } from "../Actions/ViewRidesActions";
import * as actions from '../ActionTypes/ViewRideActionTypes';

export const ViewRidesReducer = (state = ViewRidesInitialState, action : { type: any; payload: any; }) : ViewRidesState=> {
    // console.log(action)
    switch(action.type){
        case actions.FETCHED_OFFER_RIDES :
            return {
                ...state ,
                OfferRides : action.payload
            }
        case actions.FETCH_OFFER_RIDES_FAILURE:
            return {
                ...state ,
                alert : action.payload,
                alertType : "warning"
            }
        case actions.FETCHED_BOOKED_RIDES :
            return {
                ...state ,
                BookedRides : action.payload
            }
        case actions.FETCH_BOOKED_RIDES_FAILURE :
            return {
                ...state ,
                alert : action.payload,
                alertType : "warning"
            }
            case actions.FETCHED_REQUESTED_RIDES :
            return {
                ...state ,
                RideRequests : action.payload
            }
        case actions.FETCH_REQUESTED_RIDES_FAILURE:
            return {
                ...state ,
                alert : action.payload,
                alertType : "warning"
            }
        case actions.FETCHED_OPENED_RIDE : 
            return {
                ...state ,
                ride : action.payload.ride,
                bookings : action.payload.bookings,
                requests : action.payload.requests
            }
        case actions.FETCH_OPENED_RIDE_FAILURE :
            return {
                ...state ,
                alert : action.payload,
                alertType : "warning"
            }  
        case actions.CANCEL_RIDE: 
        case actions.CANCEL_RIDE_REQUEST_RIDER:
        case  actions.CANCEL_BOOKING_RIDER:
        case actions.CANCEL_RIDE_REQUEST_DRIVER:
        case  actions.CANCEL_BOOKING_DRIVER:
        case actions.ACCEPTED_RIDE :
        return {
            ...state ,
            alert : action.payload,
            alertType : "success"
        }
        case actions.CANCEL_RIDE_FAILURE :
        case actions.CANCEL_RIDE_REQUEST_RIDER_FAILURE :
        case  actions.CANCEL_BOOKING_RIDER_FAILURE:
        case actions.CANCEL_RIDE_REQUEST_DRIVER_FAILURE :
        case  actions.CANCEL_BOOKING_DRIVER_FAILURE:
        case actions.ACCEPT_RIDE_FAILURE :
        return {
            ...state ,
            alert : action.payload,
            alertType : "warning"
        }    
        case actions.ALERT_TIMEOUT :
        return {
            ...state ,
            alert : "",
            alertType : ""
        }
        default :
            return state 
    }
} 