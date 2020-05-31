import { combineReducers, Dispatch, Reducer } from 'redux';

// Import your state types and reducers here.
import { AuthenticationState } from './Actions/AuthenticationActions';
import { BookingState } from './Actions/BookingActions';
import { AuthenticationReducer } from './Reducers/AuthenticationReducer';
import { BookingReducer } from './Reducers/BookingReducer';

// The top-level state object
export interface ApplicationState {
  authenticate : AuthenticationState;
  booking : BookingState;
}
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authenticate : AuthenticationReducer,
    booking : BookingReducer
  });