import { ApiConnection } from "../../Services/ApiConnection";
import { Urls } from "../../Constants/Urls";
import { driverUpdated, alertTimeout, driverDetailsFetched, driverDetailsFetchFailed, promoDetailsFetched, promoUpdated, promoUpdateFailed, driverUpdateFailed, userStorageSuccess, userUpdated } from "../Actions/ProfileActions";
import { store } from "../Store";

var urls = new Urls();
var api = new ApiConnection();

export const UpdateDriver = (license : string, registrationNumber : string, carManufacturer : string, carModel : string, carYearOfManufacture : string)  => {
    return function(dispatch) {
        const data = {
        LicenseNo: license,
        RegistrationNo: registrationNumber,
        CarManufacturer: carManufacturer,
        CarModel: carModel,
        YearOfManufacture : carYearOfManufacture,
        };
        api.put(urls.DriverUpdate, data)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    var driverUpdateAction = driverUpdated(res.driver);
                    store.dispatch(driverUpdateAction);
                }
                else{
                    var driverUpdateFailedAction = driverUpdateFailed(res.error);
                    store.dispatch(driverUpdateFailedAction);
                }
                CloseAlert();
            }).catch(e => {
                console.log(e);
            });
    }
}
export const UpdatePromotionDetails = (distance : string, discount : string) =>{
    return function(dispatch) {
        const data = {
            Distance : distance,
            Discount : discount
        }
        api.put(urls.UpdatePromotions, data)
                .then(res => {
                    console.log(res);
                    if(res.status === 200){
                        var updatePromotionAction = promoUpdated(res.promotion)
                        store.dispatch(updatePromotionAction);
                    }
                    else{
                        var udatePromotionFailedAction = promoUpdateFailed(res.error)
                        store.dispatch(udatePromotionFailedAction);
                    }
                    CloseAlert();
                })
                .catch(err => console.log(err));
    }
}
export const GetDriverDetails = () => {
        api.getAsync(urls.GetDriverDetails)
        .then(res => {
            console.log(res);
                if (res.status === 200) {
                    var fetchedDriverAction = driverDetailsFetched(res.driver);
                    store.dispatch(fetchedDriverAction);
                }
                else {
                    var fetchDriverFailedAction = driverDetailsFetchFailed(res.error);
                    store.dispatch(fetchDriverFailedAction);
                }
            }).catch(e => {
                console.log(e);
            });
}
export const GetPromotion = () => {
        api.getAsync(urls.GetPromotions)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var promoFetchedAction = promoDetailsFetched(res.promotion);
                store.dispatch(promoFetchedAction);
            }
            else {
                var promoFetchFailedAction = driverDetailsFetchFailed(res.error);
                store.dispatch(promoFetchFailedAction);
            }
        }).catch(e => {
            console.log(e);
        });
}
export const GetUser =() => {
    console.log("here");
    if (localStorage.authToken) {
      api.getAsync(urls.GetUser)
      .then((res)=> {
        console.log(res);
        if(res.status === 200)
        {
          var action = userStorageSuccess(res.user);
          store.dispatch(action);
        }
      })
    } 
}

export const UpdateUser = (name : string, email : string, phoneNumber : string) => {
    return function(dispatch){
      const data = {
        Name : name,
        PhoneNumber : phoneNumber,
        Email : email
      }
      api.put(urls.UserUpdate, data)
      .then(res => {
        console.log(res);
        if (res.token) {
          window.localStorage.setItem("authToken", res.token);
          var userUpdatedAction = userUpdated(res.user);
          store.dispatch(userUpdatedAction);
          CloseAlert();
        }
      });
    }
  }
export const CloseAlert = () =>{
        var action = alertTimeout();
        setTimeout(() => {store.dispatch(action)}, 2000);
}