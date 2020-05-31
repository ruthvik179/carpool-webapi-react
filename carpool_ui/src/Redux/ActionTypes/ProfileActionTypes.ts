import { User } from "../../Interfaces/Login/User";
import { Driver } from "../../Interfaces/Driver";
import { Promotion } from "../../Interfaces/Promotion/Promotion";
export const FETCHED_DRIVER_DETAILS = "FETCHED_DRIVER_DETAILS";
export const FETCHED_DRIVER_DETAILS_FAILURE = "FETCHED_DRIVER_DETAILS_FAILURE";
export const FETCHED_PROMO_DETAILS = "FETCHED_PROMO_DETAILS"
export const FETCHED_PROMO_DETAILS_FAILURE = "FETCHED_PROMO_DETAILS_FAILURE"
export const DRIVER_UPDATED = "DRIVER_UPDATED";
export const DRIVER_UPDATE_FAILURE = "DRIVER_UPDATE_FAILURE";
export const PROMOTION_UPDATED = "PROMOTION_UPDATED";
export const PROMOTION_UPDATE_FAILURE = "PROMOTION_UPDATE_FAILURE";
export const USER_STORED = "USER_STORED";
export const USER_UPDATED = "USER_UPDATED";
export const ALERT_TIMEOUT = "ALERT_TIMEOUT";

export interface FetchedDriverDetails {
    type : typeof FETCHED_DRIVER_DETAILS,
    payload : Driver
}
export interface FetchDriverDetailsFailed {
    type : typeof FETCHED_DRIVER_DETAILS_FAILURE,
    payload : string
}
export interface FetchedPromoDetails {
    type : typeof FETCHED_PROMO_DETAILS,
    payload : Promotion
}
export interface FetchedPromoDetailsFailed {
    type : typeof FETCHED_PROMO_DETAILS_FAILURE,
    payload : string
}
export interface DriverUpdated {
    type : typeof DRIVER_UPDATED,
    payload : Driver
}
export interface DriverUpdateFailed {
    type : typeof DRIVER_UPDATE_FAILURE,
    payload : string
}
export interface PromotionUpdated {
    type : typeof PROMOTION_UPDATED,
    payload : Promotion
}
export interface PromotionUpdateFailed {
    type : typeof PROMOTION_UPDATE_FAILURE,
    payload : string
}
export interface UserStorageAction {
    type : typeof USER_STORED;
    payload : User;
}
export interface UserUpdated {
    type : typeof USER_UPDATED;
    payload : User;
}
export interface AlertTimeout {
    type : typeof ALERT_TIMEOUT,
    payload : string
}