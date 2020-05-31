import * as actions from '../ActionTypes/BookingActionTypes';
import { BookingInitialState, BookingState } from '../Actions/BookingActions';


export const BookingReducer = (state=BookingInitialState, action: { type: any; payload: any; }) : BookingState=>{
    // console.log(action)
    switch(action.type){
        case actions.FETCHED_MATCHES:
            return{
                submittedSource: action.payload.source,
                submittedDestination: action.payload.destination,
                submittedDate: action.payload.date,
                submittedTime: action.payload.time,
                searchResults : action.payload.searchResults,
                error : "",
                distance : action.payload.distance,
                success : false,
                alertType : '',
                alert : ''
            }
        case actions.FETCH_MATCHES_FAILURE:
            return{
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
                  error : action.payload,
                  distance : 0,
                  success : false,
                  alertType : '',
                  alert : ''
            }
        case actions.RIDE_REQUESTED : 
            return{
                ...state, 
                alertType : "success",
                alert : action.payload
            }
        case actions.RIDE_REQUEST_FAILURE : 
        return{
            ...state, 
            alertType : "warning",
            alert : action.payload
        }
        case actions.ALERT_TIMEOUT :
            return {
                ...state ,
                alert : "",
                alertType : ""
            }
        default:
            return state
    }
}