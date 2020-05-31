import * as actions from '../ActionTypes/AuthenticationActionTypes';
import { User } from '../../Interfaces/Login/User';
export interface AuthenticationState {
    error : string;
    isAuthenticated : boolean;
}
export const AuthenticationInitialState : AuthenticationState = {
    error:'',
    isAuthenticated: false,
}
export const userAutenticationSuccess = () : actions.UserAuthenticatedAction =>({
    type: actions.USER_AUTHENTICATED,
    payload:{},
});

export const userAutenticationFailure = (data : string) : actions.UserNotAuthenticatedAction=>({
    type: actions.USER_NOT_AUTHENTICATED,
    payload:data
});
export const userLogout = () : actions.UserLogout =>({
    type: actions.USER_LOGOUT,
    payload: {}
});
