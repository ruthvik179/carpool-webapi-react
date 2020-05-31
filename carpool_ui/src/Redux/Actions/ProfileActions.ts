import { User } from "../../Interfaces/Login/User";
import { Driver } from "../../Interfaces/Driver";
import { Promotion } from "../../Interfaces/Promotion/Promotion";
import * as actions from "../ActionTypes/ProfileActionTypes"

export interface ProfileState {
    user : User;
    DriverDetails : Driver;
    PromotionDetails : Promotion;
    alertType : string;
    alert : string;
}

export const ProfileInitialState : ProfileState = {
    user : {
        name : "",
        email : "",
        phoneNumber : ""
    },
    DriverDetails : {
        license : "",
        registrationNumber : "",
        carManufacturer : "",
        carModel : "",
        carYearOfManufacture : "",
     },
     PromotionDetails : {
        distance : "",
        discount : ""
     },
     alertType : "",
     alert : ""
}

export const driverDetailsFetched = (data : Driver) : actions.FetchedDriverDetails => ({
    type : actions.FETCHED_DRIVER_DETAILS,
    payload : data
});
export const driverDetailsFetchFailed = (data : string) : actions.FetchDriverDetailsFailed => ({
    type : actions.FETCHED_DRIVER_DETAILS_FAILURE,
    payload : data
});
export const promoDetailsFetched = (data : Promotion) : actions.FetchedPromoDetails => ({
    type : actions.FETCHED_PROMO_DETAILS,
    payload : data
});
export const promoDetailsFetchFailed = (data : string) : actions.FetchedPromoDetailsFailed => ({
    type : actions.FETCHED_PROMO_DETAILS_FAILURE,
    payload : data
});
export const driverUpdated = (data : Driver) : actions.DriverUpdated => ({
    type : actions.DRIVER_UPDATED,
    payload : data
});
export const driverUpdateFailed = (data : string) : actions.DriverUpdateFailed => ({
    type : actions.DRIVER_UPDATE_FAILURE,
    payload : data
});
export const promoUpdated = (data : Promotion) : actions.PromotionUpdated => ({
    type : actions.PROMOTION_UPDATED,
    payload : data
});
export const promoUpdateFailed = (data : string) : actions.PromotionUpdateFailed => ({
    type : actions.PROMOTION_UPDATE_FAILURE,
    payload : data
});
export const userStorageSuccess = (data : User) : actions.UserStorageAction =>({
    type: actions.USER_STORED,
    payload:data,
});
export const userUpdated = (data : User) : actions.UserUpdated => ({
    type : actions.USER_UPDATED,
    payload : data
})
export const alertTimeout = () : actions.AlertTimeout => ({
    type : actions.ALERT_TIMEOUT,
    payload : ""
});
