import React from 'react';
import LocationGraphic from './../LocationGraphic'
import Location from './Location'
interface MyProps{
    values : any
    handlePlaceChange : (type : string, place : any) => void
    handleChange : (event: { target: { name: any; value: any;}; } ,) => void
}
function Route(props : MyProps) {
    return (
        <div className="route">
            <div className="route-details">
                <div className="source">
                    <label htmlFor="Source">From</label>
                    <Location for={"source"}  handlePlaceChange={props.handlePlaceChange} value={props.values.source.name}/>
                </div >
                <div className="destination">
                    <label htmlFor="Destination">To</label>
                    <Location for={"to"} handlePlaceChange={props.handlePlaceChange} value={props.values.destination.name} />
                </div>
                <div className="date">
                    <label htmlFor="Date">Date</label>
                    <input type="Date" id="date" name="date" placeholder="xx/mm/yy" onChange = {(e)=>props.handleChange(e)}/>
                </div>
            </div>
            <div className="location-graphic-container">
                <LocationGraphic/>
            </div>
        </div>
    );
}

export default Route;


