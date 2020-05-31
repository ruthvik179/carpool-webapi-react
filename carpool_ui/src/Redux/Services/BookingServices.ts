import { Urls } from "../../Constants/Urls";
import { ApiConnection } from "../../Services/ApiConnection";
import { matchesFetched, rideRequested, alertTimeout } from "../Actions/BookingActions";
import { store } from "../Store";
import { Place } from "../../Interfaces/Booking/Place";

var urls = new Urls();
var api = new ApiConnection();
export const GetRideMatches = (source : Place, destination : Place, date : string, time : string) => {
    return function(dispatch) {
    var srcLocation = new google.maps.LatLng(source.lat , source.lng);
    var dstLocation = new google.maps.LatLng(destination.lat, destination.lng);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation);
    distance = +distance.toFixed(2);
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
            Id : source.id
        },
        Date: date,
        Time : time,
        Distance : distance/1000
    };
    api.post(urls.GetRideMatches, data)
    .then(res => {
        console.log(res)
        if(res.status === 200)
        {
            var actionParameter = { source : source, destination : destination, date : date, time : time, distance: distance , searchResults : res.matches}
            var action = matchesFetched(actionParameter)
            store.dispatch(action);
        }
    }
    )
    .catch(err => console.log(err));
    }
}
export const RequestRide = (id : string) => {
    return function(dispatch) {
        var state = store.getState();
        const data = {
            Source: {
                Name : state.booking.submittedSource.name,
                Latitude : state.booking.submittedSource.lat,
                Longitude : state.booking.submittedSource.lng,
                Id : state.booking.submittedSource.id
            },
            Destination: {
                Name : state.booking.submittedDestination.name,
                Latitude : state.booking.submittedDestination.lat,
                Longitude : state.booking.submittedDestination.lng,
                Id : state.booking.submittedDestination.id
            },
            Date : state.booking.submittedDate,
            Time : state.booking.submittedTime,
            RideId : id,
            distance : state.booking.distance/1000
        }
        api.post(urls.RequestRide, data)
        .then(res => {
            if(res.status === 200){
                var requestedRideAction = rideRequested(res.message);
                store.dispatch(requestedRideAction);
            }
            else {
                var requestRideFailedAction = rideRequested(res.error);
                store.dispatch(requestRideFailedAction)
            }
            CloseAlert();
        })
    }
} 
export const CloseAlert = () =>{
    var action = alertTimeout();
    setTimeout(() => {store.dispatch(action)}, 2000);
}