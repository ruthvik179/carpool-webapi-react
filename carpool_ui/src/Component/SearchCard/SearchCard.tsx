import React from 'react';
import { Card, Row, Col, Badge } from 'reactstrap';
import LocationGraphic from './../LocationGraphic'
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
    handleRequest? :(Id : string) => void;
    status ?: string;
    type ?: string;
}
function SearchResult(props : MyProps) {
    var source_array = props.source.split(',');
    var destination_array = props.destination.split(',');
    return (
        <Card className="result-card" onClick={() => {
            if(props.handleClick)
            {
                props.handleClick(props.id)
            }           
        }}>
            <Row className="result-header">
                <Col xs="6" className="result-heading">
                    <h1>{props.name}{
                        props.status ? <Badge color="warning" pill>{props.status}</Badge> : null
                    }</h1>
                </Col>
                <Col xs="6" className="profile-image">
                    <img className="profile-image" src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-1024x941.png" alt="Profile"></img>
                </Col>
            </Row>
            <Row>
                <Col xs="3" className="result-column">
                    <p className="label">From</p>
                    <p>{source_array[0]}</p>
                </Col>
                <Col xs="4" className="result-column location-graphic-container">
                    <LocationGraphic/>
                </Col>
                <Col xs="5"className="result-column">
                    <p className="label">To</p>
                    <p>{destination_array[0]}</p>
                </Col>
            </Row>
            <Row>
                <Col xs="7" className="result-column">
                    <p className="label">Date</p>
                    <p>{props.date}</p>
                </Col>
                <Col xs="5" className="result-column">
                    <p className="label">Time</p>
                    <p>{props.time}</p>
                </Col>
            </Row>
            <Row>
                {props.type!== "offer" ?
                    <Col xs="7" className="result-column">
                        <p className="label">Price</p>
                        <p>₹{props.price}</p>
                    </Col> : null
                }
                {props.type == "offer" || props.type =="result" ?
                    <Col xs="5" className="result-column">
                        <p className="label">Seat Availability</p>
                        <p>{props.seats}</p>
                    </Col> : null
                }
            </Row>
            <Row>
                {props.type === "result" ? <button className="request-button" onClick = {() => {
                    if(props.handleRequest)
                    {
                        props.handleRequest(props.id)
                    }      
                }}> Request </button> : null}
            </Row>
        </Card>
    );
}

export default SearchResult;