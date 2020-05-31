import React, { useState } from 'react';
import { Card, Row, Col, Badge, Collapse } from 'reactstrap';
import LocationGraphic from './../LocationGraphic'
import {RideConstants} from '../../Constants/RideConstants'
import { HelperService } from '../../Services/HelperService';
import { Price } from '../../Interfaces/Booking/Price';
var rideConstants = new RideConstants();
var helperService = new HelperService();

interface MyProps{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price ?: Price;
    seats : number;
    id : string;
    distance? : number;
    handleClick? : (Id : string) => void;
    handleButton? :(Id : string) => void;
    status ?: string;
    type ?: string;
    cancellationCharges ?: number;
}
function SearchResult(props : MyProps) {
    const [displayPriceBreakDown, setDisplayPriceBreakDown] = useState(false);
    var source_array = props.source.split(',');
    var destination_array = props.destination.split(',');
    const status =  props.status !== "Cancelled" && props.status !== "Rejected" && props.status !=="Accepted" && props.type !== "offer";
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
        if(props.cancellationCharges){
            return(
            <Col xs="5" className="result-column">
                <p className="label">{rideConstants.CancellationChargesLabel}</p>
                <p>₹{helperService.formatCurrency(props.cancellationCharges || 0)}</p>
            </Col>);
        }
        else{
            return(
            <Col xs="5" className="result-column">
                <p className="label">{rideConstants.PriceLabel}</p>
                <p>₹{helperService.formatCurrency(props.price?.total || 0)}</p>
            </Col>);
        }
    }
    const popoverToggle = () => setDisplayPriceBreakDown(!displayPriceBreakDown)
    const showSeatAvailability = () => {
        return(
        <Col xs="7" className="result-column">
            <p className="label">{rideConstants.SeatsLabel}</p>
            <p>{props.seats}</p>
        </Col>);
    }
    const showButton = () => {
        return(
        <Col xs="7" className="result-column">
            <button className="request-button" onClick = {() => {
                if(props.handleButton)
                {
                    props.handleButton(props.id)
                }      
            }}>{props.type === "result" ? "Request" : "Cancel"}
            </button>
        </Col>
        );
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
                {props.type === "offer" || props.type ==="result" ? showSeatAvailability() : null }
                {props.type!== "offer" ? showPrice() : null}
            </Row>
            <Row>
                {props.type === "result" || status ?  showButton() : null}   
                {props.type!== "offer" && props.price ? 
                <Col xs="5" onClick={popoverToggle} className="result-column price-breakdown">
                    <button id="popover1" className="heading">
                        Price Breakdown
                    </button>
                    <Collapse placement="bottom" isOpen={displayPriceBreakDown} target="popover1" >
                        <Card className="result-column">
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.PriceLabel}</p>
                                </Col>
                                <Col xs="6">
                                    <p>₹{helperService.formatCurrency(props.price?.amount || 0)}</p>    
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.CentralTaxLabel}</p>
                                </Col>
                                <Col xs="6">
                                    <p>₹{helperService.formatCurrency(props.price?.cgst || 0)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.StateTaxLabel}</p>
                                </Col>
                                <Col xs="6">
                                    <p>₹{helperService.formatCurrency(props.price?.sgst || 0)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.DriverDiscountLabel}</p>
                                </Col>
                                <Col xs="6">
                                    <p>(-)₹{helperService.formatCurrency(props.price?.driverDiscount || 0)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.AppDiscountLabel}</p>
                                </Col>
                                <Col xs="6">
                                    <p>(-)₹{helperService.formatCurrency(props.price?.appDiscount || 0)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <p className="label">{rideConstants.TotalLabel}</p>
                                </Col>
                                <Col xs="6">
                                <p>₹{helperService.formatCurrency(props.price?.total || 0)}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Collapse> 
            </Col> 
            : null}
            </Row>
        </Card>
    );
}

export default SearchResult;

