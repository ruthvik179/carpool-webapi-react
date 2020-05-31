import {userAutenticationSuccess, userLogout} from '../Actions/AuthenticationActions';
import {userAutenticationFailure} from '../Actions/AuthenticationActions';
import { Urls } from '../../Constants/Urls';
import { ApiConnection } from '../../Services/ApiConnection'
import { LoginPageConstants } from '../../Constants/LoginPageConstants';
import { store } from '../Store';
import { GetUser, GetDriverDetails, GetPromotion } from './ProfileServices';
var loginPageConstants = new LoginPageConstants();
var urls = new Urls();
var api = new ApiConnection();
export const authenticateUser =(username : string, password : string) => {
    return function(dispatch){
        const data = {
            Email : username,
            Password : password,
          }
        api.postWithoutAuth(urls.Login, data)
        .then(res => {
        console.log(res);
        if(!res.status)
        {
          if (res.token) {
            window.localStorage.setItem("authToken", res.token);
            authenticateUserFromToken();
          }
        }
        else if(res.status !== 200)
        {
            var notAuthenticatedAction = userAutenticationFailure(loginPageConstants.LoginError);
            store.dispatch(notAuthenticatedAction);
        }
        });
    }
}
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  var action = userLogout();
  store.dispatch(action);
}
export const authenticateUserFromToken =() => {
  if (localStorage.authToken) {
    var authenticatedAction = userAutenticationSuccess()
    store.dispatch(authenticatedAction);
    GetUser();
    GetDriverDetails();
    GetPromotion();
  } 
}

