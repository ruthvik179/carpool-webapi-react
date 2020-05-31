import { Urls } from "../../Constants/Urls";
import { ApiConnection } from "../../Services/ApiConnection";
import { alertTimeout, openedRideFetched, openedRideFetchFailed, offerRidesFetched, offerRidesFetchFailed, bookedRidesFetched, bookedRidesFetchFailed, requestedRidesFetched, requestedRidesFetchFailed, cancelledRide, cancelledBookingRider, cancelRideFailed, cancelBookingRiderFailed, cancelledRideRequestRider, cancelRideRequestRiderFailed, acceptedRide, acceptRideFaied, cancelledRideRequestDriver, cancelRideRequestDriverFailed, cancelledBookingDriver, cancelBookingDriverFailed } from "../Actions/ViewRidesActions";
import { store } from "../Store";
import {ViewRidesConstants} from "../../Constants/ViewRidesConstants"
var urls = new Urls();
var api = new ApiConnection();
var viewRidesConstants = new ViewRidesConstants();
export const GetRideDetails = (id : string) => {
    return function(dispatch) {
        api.get(`${urls.GetRideDetails}${id}`)
        .then((res) =>{
            if(res.status === 200)
            {
                var openedAction = openedRideFetched(res.openedRide);
                store.dispatch(openedAction);
            }
            else 
            {
                var openFailedAction = openedRideFetchFailed(viewRidesConstants.OpenRideError);
                store.dispatch(openFailedAction);
                CloseAlert();
            }
        })
    }
}
export const GetOfferRides = () => {
    return function(dispatch) {
        api.get(urls.GetOfferRides)
        .then((res) =>{
            console.log(res)
            if(res.status === 200)
            {
                var fetchAction = offerRidesFetched(res.matches);
                store.dispatch(fetchAction);
            }
            else 
            {
                var fetchFailedAction = offerRidesFetchFailed(viewRidesConstants.OfferRidesError);
                store.dispatch(fetchFailedAction);
                CloseAlert();
            }
        })
    }
}
export const GetBookedRides = () => {
    return function(dispatch) {
        api.get(urls.GetBookings)
        .then((res) =>{
            if(res.status === 200)
            {
                var fetchAction = bookedRidesFetched(res.bookings);
                store.dispatch(fetchAction);
            }
            else 
            {
                var fetchFailedAction = bookedRidesFetchFailed(viewRidesConstants.BookedRidesError);
                store.dispatch(fetchFailedAction);
                CloseAlert();
            }
        })
    }
}
export const GetRideRequests = () => {
    return function(dispatch) {
        api.get(urls.GetRideRequests)
        .then((res) =>{
            if(res.status === 200)
            {
                var fetchAction = requestedRidesFetched(res.requests);
                store.dispatch(fetchAction);
            }
            else 
            {
                var fetchFailedAction = requestedRidesFetchFailed(viewRidesConstants.BookedRidesError);
                store.dispatch(fetchFailedAction);
                CloseAlert();
            }
        })
    }
}

export const CancelRide = (id : string) => {
    return function(dispatch) {
        api.post(urls.CancelRide, id )
            .then(res =>{
            if(res.status === 200){
                var cancelledRideAction = cancelledRide(res.message)
                store.dispatch(cancelledRideAction);
                GetOfferRides();
            }
            else{
                var cancelRideFailedAction = cancelRideFailed(res.error)
                store.dispatch(cancelRideFailedAction);
            }
            CloseAlert();
            })
            .catch(err => console.log(err));
    }
}
export const CancelRideRequestRider = (id : string) => {
    return function(dispatch) {
        api.post(urls.CancelRequest, id)
            .then(res =>{
            if(res.status === 200){
                GetRideRequests();
                var cancelledRideRequestAction = cancelledRideRequestRider(res.message)
                store.dispatch(cancelledRideRequestAction);
            }
            else{
                var cancelRideRequestFailedAction = cancelRideRequestRiderFailed(res.error)
                store.dispatch(cancelRideRequestFailedAction);
            }
            CloseAlert();
            })
            .catch(err => console.log(err));
    }
}
export const CancelBookingRider = (id : string) => {
    return function(dispatch) {
        api.post(urls.CancelBookingRider, id)
            .then(res =>{
            if(res.status === 200){
                GetBookedRides();
                var cancelledBookingAction = cancelledBookingRider(res.message)
                store.dispatch(cancelledBookingAction);
            }
            else{
                var cancelBookingFailedAction = cancelBookingRiderFailed(res.error)
                store.dispatch(cancelBookingFailedAction);
            }
            CloseAlert();
            })
            .catch(err => console.log(err));
    }
}
export const ConfirmRideDriver = (id : string, flag : boolean) => {
    const data = {
        Accepted : flag,
        Id : id
      }
      api.postAync(urls.ConfirmBooking, data)
        .then(res =>{
            console.log(res)
            if(res.status === 200){
                if(flag !== true){
                    var cancelledRideAction = cancelledRideRequestDriver(res.message);
                    store.dispatch(cancelledRideAction);
                }
                else{
                    var acceptedRideAction = acceptedRide(res.message);
                    store.dispatch(acceptedRideAction);
                }
            }
            else{
                if(flag !== true){
                    var cancelledRideFailedAction = cancelRideRequestDriverFailed(res.error);
                    store.dispatch(cancelledRideFailedAction);
                }
                else{
                    var acceptRideFailedAction = acceptRideFaied(res.error);
                    store.dispatch(acceptRideFailedAction);
                }
            }
            CloseAlert();
        })
        .catch(err => console.log(err));
}
export const CancelBookingDriver = (id : string) => {
    api.postAync(urls.CancelBookingDriver, id)
    .then(res =>{
        console.log(res);
        if(res.status === 200){
            var cancelledBookingAction = cancelledBookingDriver(res.message);
            store.dispatch(cancelledBookingAction)
        }
        else{
            var cancelBookingFailedAction = cancelBookingDriverFailed(res.error);
            store.dispatch(cancelBookingFailedAction);
        }
        CloseAlert();
    })
    .catch(err => console.log(err));
}
export const CloseAlert = () =>{
    var action = alertTimeout();
    setTimeout(() => {store.dispatch(action)}, 2000);
}