import React from 'react';
import RadioButton from '../RadioButton';
import {RideConstants} from '../../Constants/RideConstants'
var rideConstants = new RideConstants();
interface MyProps{
    handleChange : (event: any) => void
}
function Timings(props : MyProps) {
    const handleClick = (event : any) =>{
        var n = event.target.innerHTML.indexOf(">");
        var value = event.target.innerHTML.substring(n+1);
        const data ={ 
            target : {
                name : "time",
                value : value,
            },
        };
        props.handleChange(data);
    }
    return (
        <div>
            <div className="time">
                <label htmlFor="Time">{rideConstants.TimeLabel}</label>
            </div>
            <div className="button-group-pills text-center" data-toggle="buttons">
                <RadioButton handleClick = {handleClick} defaultValue = "5AM - 9AM" name="time" />
                <RadioButton handleClick = {handleClick} defaultValue = "9AM - 12PM" name="time"/>
                <RadioButton handleClick = {handleClick} defaultValue = "12PM- 3PM" name="time" />
                <RadioButton handleClick = {handleClick} defaultValue = "3PM - 6PM" name="time" />
                <RadioButton handleClick = {handleClick} defaultValue = "6PM - 9PM" name="time" />
            </div>
        </div>
    );
}

export default Timings;




