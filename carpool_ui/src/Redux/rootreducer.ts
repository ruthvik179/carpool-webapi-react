import { combineReducers } from "redux";

import {AuthenticationReducer} from './Reducers/AuthenticationReducer'
import {ViewRidesReducer} from './Reducers/ViewRidesReducer'
import {BookingReducer} from './Reducers/BookingReducer'
import { ProfileReducer } from "./Reducers/ProfileReducer";
import { OfferReducer } from "./Reducers/OfferRideReducer";

export const rootReducer = combineReducers({
    authenticate: AuthenticationReducer,
    booking : BookingReducer,
    rides : ViewRidesReducer,
    profile : ProfileReducer,
    offer : OfferReducer
})

export type AppState = ReturnType<typeof rootReducer>