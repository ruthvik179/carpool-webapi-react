import * as actions from '../ActionTypes/AuthenticationActionTypes';
import { AuthenticationInitialState, AuthenticationState } from '../Actions/AuthenticationActions';

export const AuthenticationReducer = (state=AuthenticationInitialState, action: { type: any; payload: any; }) : AuthenticationState=>{
    // console.log(action)
    switch(action.type){
        case actions.USER_AUTHENTICATED:
            return{
                error :'',
                isAuthenticated : true
            }
        case actions.USER_NOT_AUTHENTICATED:
            return{
                error : action.payload,
                isAuthenticated : false
            }
        case actions.USER_LOGOUT:
        return{
            error : '',
            isAuthenticated : false
        }
        default:
            return state
    }
}