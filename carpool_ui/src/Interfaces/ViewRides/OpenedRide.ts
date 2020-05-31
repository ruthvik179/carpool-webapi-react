import { RideDetails } from "./RideDetails";
import { BookingsRequests } from "../../Component/ViewRides/Popup";

export interface OpenedRide {
    rides : RideDetails;
    bookings : BookingsRequests;
    requests : BookingsRequests;
}