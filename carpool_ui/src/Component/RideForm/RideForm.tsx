import React from 'react';
import { Card } from 'reactstrap';
import './../../Styles/style.scss';
import Route from './Route'
import Timings from './RideTimings'
import Button from './../Button'
import ToggleButton from './ToggleButton'
import {RideConstants} from '../../Constants/RideConstants'
var rideConstants = new RideConstants();
interface MyProps{
    Heading : string,
    values :{},
    next? : () => void,
    handleChange : (event: { target: { name: any; value: any;}; } , ) => void,
    handlePlaceChange : (type : string, place : any) => void,
    handleSubmit ?: (e: { preventDefault: () => void; }) => void,
    error ?: string,
}
function RideForm(props : MyProps) {
    return (
        <Card className="ride-form" >
            <div className="sub-form">
                <div className="heading">
                    <div>
                        <h1>{props.Heading} </h1>
                        <p>{rideConstants.Slogan}</p>
                    </div>
                    <ToggleButton/>
                </div>
                <div>
                    <div>
                        {props.error ? <p className="error">{props.error}</p> : null}
                    </div>
                    <Route
                    handlePlaceChange = {props.handlePlaceChange}
                    handleChange={props.handleChange}
                    values = {props.values}
                    />
                    <Timings 
                    handleChange={props.handleChange}
                    />
                    <Button 
                    Heading={props.Heading} 
                    next={props.next}
                    handleSubmit = {props.handleSubmit}
                    />
                </div>
            </div>
        </Card>
    );
}

export default RideForm;

