import { User } from "../../Interfaces/Login/User";

export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const USER_NOT_AUTHENTICATED = "USER_NOT_AUTHENTICATED";
export const USER_LOGOUT = "USER_LOGOUT";

export interface UserAuthenticatedAction {
    type : typeof USER_AUTHENTICATED;
    payload : {};
}
export interface UserNotAuthenticatedAction {
    type : typeof USER_NOT_AUTHENTICATED;
    payload : string;
}
export interface UserLogout {
    type : typeof USER_LOGOUT;
    payload : {};
}

export type UserAuthenticationTypes = UserAuthenticatedAction | UserNotAuthenticatedAction | UserLogout;