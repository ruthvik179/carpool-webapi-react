import { ProfileInitialState, ProfileState } from "../Actions/ProfileActions";
import * as actions from "../ActionTypes/ProfileActionTypes"


export const ProfileReducer = (state=ProfileInitialState, action: { type: any; payload: any; }) : ProfileState=>{
    // console.log(action);
    switch(action.type){
        case actions.FETCHED_DRIVER_DETAILS: 
        return {
            ...state,
            DriverDetails : action.payload
        }
        case actions.DRIVER_UPDATED: 
        return {
            ...state,
            DriverDetails : action.payload,
            alert : "Driver Updated Successfully",
            alertType : "success"
        }
        case actions.FETCHED_PROMO_DETAILS:
        return {
            ...state,
            PromotionDetails : action.payload
        }
        case actions.PROMOTION_UPDATED: 
        return {
            ...state,
            alert : "Promotion Updated Successfully",
            alertType : "success"
        }
        case actions.FETCHED_DRIVER_DETAILS_FAILURE:
        case actions.DRIVER_UPDATE_FAILURE: 
        case actions.FETCHED_PROMO_DETAILS_FAILURE:
        case actions.PROMOTION_UPDATE_FAILURE:
        return {
            ...state,
            alert : action.payload,
            alertType : "warning"
        }
        case actions.USER_STORED:
            return {
                ...state,
                user : action.payload
            }
        case actions.USER_UPDATED :
            return {
                ...state,
                alert : "User Updated Succesfully",
                alertType : "success",
                user : action.payload
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