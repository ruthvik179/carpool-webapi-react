import React from 'react';
import { Card, Row, Col, Badge } from 'reactstrap';
import LocationGraphic from './../LocationGraphic'
import {RideConstants} from '../../Constants/RideConstants'
import { HelperService } from '../../Services/HelperService';
var rideConstants = new RideConstants();
var helperService = new HelperService();

interface MyProps{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price ?: number;
    seats : number;
    id : string;
    distance? : number;
    handleClick? : (Id : string) => void;
    handleButton? :(Id : string) => void;
    status ?: string;
    type ?: string;
    cancellationCharges ?: number;
    sgst ?: number;
    cgst ?: number;
}
function SearchResult(props : MyProps) {
    const charges = props.cancellationCharges ? props.cancellationCharges : 0;
    var source_array = props.source.split(',');
    var destination_array = props.destination.split(',');
    const status =  props.status !== "Cancelled" && props.status !== "Rejected" && props.status !=="Accepted" && props.type !== "offer";
    var cancelled = charges > 0 ?  true :false ;
    const showHeader = () =>{
        return (
        <Row className="result-header">
            <Col xs="6" className="result-heading">
                <h1>{props.name}{
                    props.status ? <Badge color="warning" pill>{props.status}</Badge> : null
                }</h1>
            </Col>
            <Col xs="6" className="profile-image">
                <img className="profile-image" src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-1024x941.png" alt="Profile"></img>
            </Col>
        </Row>);
    }
    const showPrice = () => {
        return(
        <Col xs="7" className="result-column">
            <p className="label">{rideConstants.PriceLabel}</p>
            <p>₹{helperService.formatCurrency(props.price || 0)}</p>
        </Col>);
    }
    const showSeatAvailability = () => {
        return(
        <Col xs="5" className="result-column">
            <p className="label">{rideConstants.SeatsLabel}</p>
            <p>{props.seats}</p>
        </Col>);
    }
    const showTaxes = () => {
        return(
        <Col xs="5" className="result-column">
            <Row className="taxes">
                <p className="label">{rideConstants.StateTaxLabel}</p>
                <p>{helperService.formatCurrency(props.sgst || 0)}</p>
                <p className="label">{rideConstants.CentralTaxLabel}</p>
                <p>{helperService.formatCurrency(props.cgst || 0)}</p>
            </Row>
            {cancelled? showCancellationCharges(): null}
        </Col>);
    }
    const showCancellationCharges = () => {
        return(
        <Row xs="5" className="result-column">
            <p className="label">{rideConstants.CancellationChargesLabel}</p>
            <p>{helperService.formatCurrency(props.cancellationCharges || 0)}</p>
        </Row>);
    }
    const showButton = () => {
        return(
        <button className="request-button" onClick = {() => {
            if(props.handleButton)
            {
                props.handleButton(props.id)
            }      
        }}>{props.type === "result" ? "Request" : "Cancel"}</button>);
    }
    return (
        <Card className="result-card" onClick={() => {
            if(props.handleClick)
            {
                props.handleClick(props.id)
            }           
        }}>
            { props.type !== "offer" ? showHeader() : null}
            <Row>
                <Col xs="3" className="result-column">
                    <p className="label">{rideConstants.SourceLabel}</p>
                    <p>{source_array[0]}</p>
                </Col>
                <Col xs="4" className="result-column location-graphic-container">
                    <LocationGraphic/>
                </Col>
                <Col xs="5"className="result-column">
                    <p className="label">{rideConstants.DestinationLabel}</p>
                    <p>{destination_array[0]}</p>
                </Col>
            </Row>
            <Row>
                <Col xs="7" className="result-column">
                    <p className="label">{rideConstants.DateLabel}</p>
                    <p>{props.date.slice(0,10)}</p>
                </Col>
                <Col xs="5" className="result-column">
                    <p className="label">{rideConstants.TimeLabel}</p>
                    <p>{props.time}</p>
                </Col>
            </Row>
            <Row>
                {props.type!== "offer" ? showPrice() : null}
                {props.type === "offer" || props.type ==="result" ? showSeatAvailability() : null }
                {props.sgst && props.cgst ? showTaxes() : null}
            </Row>
            <Row>
                {props.type === "result" || status ?  showButton() : null}      
            </Row>
        </Card>
    );
}

export default SearchResult;