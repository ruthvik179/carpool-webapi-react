import { Urls } from "../../Constants/Urls";
import { ApiConnection } from "../../Services/ApiConnection";
import { ViaPoints, Place } from "../../Interfaces/Booking/Place";
import { offeredRide, alertTimeout } from "../Actions/OfferRideActions";
import { store } from "../Store";

var urls = new Urls();
var api = new ApiConnection();

export const CreateRide = (source : Place, destination : Place, date : string, viaPoints : ViaPoints, time : string, seats : number) => {
    return function(dispatch){
        const data = {
            Source: {
                Name : source.name,
                Latitude : source.lat,
                Longitude : source.lng,
                Id : source.id
            },
            Destination: {
                Name : destination.name,
                Latitude : destination.lat,
                Longitude : destination.lng,
                Id : destination.id
            },
            Date: date,
            ViaPoints: viaPoints.map(viaPoint => {
                return {
                  Name: viaPoint.name,
                  Latitude: viaPoint.lat,
                  Longitude: viaPoint.lng,
                  Id: viaPoint.id
                };
            }),
            Time : time,
            Seats : seats
        };
        api.postAync(urls.CreateRide, data)
        .then(res => {
            console.log(res);
            if(res.status === 200){
            var offeredAction = offeredRide(res.message);
            store.dispatch(offeredAction);
            }
            else {
                var offerFailedAction = offeredRide(res.error);
                store.dispatch(offerFailedAction);
            }
            CloseAlert();
        }).catch(err => console.log(err));
    }
}

export const CloseAlert = () =>{
    var action = alertTimeout();
    setTimeout(() => {store.dispatch(action)}, 2000);
}