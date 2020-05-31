import React from 'react';
import RadioButton from '../RadioButton';
import {RideConstants} from '../../Constants/RideConstants'
var rideConstants = new RideConstants();
interface MyProps{
    handleChange : (event: { target: { name: any; value: any;}; },) => void
}
function Seats(props : MyProps) {
    const handleClick = (event : any) =>{
        var n = event.target.innerHTML.indexOf(">");
        var value = event.target.innerHTML.substring(n+1);
        const data ={ 
            target : {
                name : "seats",
                value : value,
            },
        };
        props.handleChange(data);
    }
    return (
        <div className="seats">
            <div className="seat-count">
                <label htmlFor="Seats">{rideConstants.SeatsLabel}</label>
            </div>
            <div className="button-group-pills text-center" data-toggle="buttons">
                <RadioButton handleClick = {handleClick} defaultValue ="1" name ="seats"/>
                <RadioButton handleClick = {handleClick} defaultValue ="2" name ="seats"/>
                <RadioButton handleClick = {handleClick} defaultValue ="3" name ="seats"/>
            </div>
        </div>
    );
}

export default Seats;