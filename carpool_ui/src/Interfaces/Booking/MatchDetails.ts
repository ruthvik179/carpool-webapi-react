import { RideMatches } from "../../Redux/Actions/BookingActions";
import { Place } from "./Place";

export interface MatchDetails { 
	source : Place; 
	destination : Place;  
	date : string; 
	time : string;  
	distance: number;
	searchResults : RideMatches;
}