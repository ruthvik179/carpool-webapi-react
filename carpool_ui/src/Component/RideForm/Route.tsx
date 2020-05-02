import React from 'react';
import LocationGraphic from './../LocationGraphic'
import Location from './Location'
import {RideConstants} from '../../Constants/RideConstants'
var rideFormConstants = new RideConstants();
interface MyProps{
    values : any
    handlePlaceChange : (type : string, place : any) => void
    handleChange : (event: { target: { name: any; value: any;}; } ,) => void
}
function Route(props : MyProps) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());
    var date = yyyy + '-' + mm + '-' + dd;
    return (
        <div className="route">
            <div className="route-details">
                <div className="source">
                    <label htmlFor="Source">{rideFormConstants.SourceLabel}</label>
                    <Location for={"source"}  handlePlaceChange={props.handlePlaceChange} value={props.values.source.name}/>
                </div >
                <div className="destination">
                    <label htmlFor="Destination">{rideFormConstants.DestinationLabel}</label>
                    <Location for={"to"} handlePlaceChange={props.handlePlaceChange} value={props.values.destination.name} />
                </div>
                <div className="date">
                    <label htmlFor="Date">{rideFormConstants.DateLabel}</label>
                    <input type="Date" min={date} id="date" name="date" placeholder={rideFormConstants.DatePlaceholder} onChange = {(e)=>props.handleChange(e)}/>
                </div>
            </div>
            <div className="location-graphic-container">
                <LocationGraphic/>
            </div>
        </div>
    );
}

export default Route;


