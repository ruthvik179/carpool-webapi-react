import React from 'react'
import { Card, Container, Row, Col } from 'reactstrap';
import Bookings from './Bookings';
import Requests from './Requests';
import { RideDetails } from '../../Interfaces/ViewRides/RideDetails';
import { BookingRequest } from '../../Interfaces/ViewRides/BookingRequest';
import { ApiConnection } from '../../Services/ApiConnection'
import {RideConstants} from '../../Constants/RideConstants'
import { Urls } from '../../Constants/Urls';
import { AppState } from '../../Redux/rootreducer';
import { connect } from 'react-redux';
import { CancelRide, CancelBookingDriver, ConfirmRideDriver } from '../../Redux/Services/ViewRidesServices';
var api = new ApiConnection();
export interface BookingsRequests extends Array<BookingRequest> { }
var rideConstants = new RideConstants();
var urls = new Urls();
interface MyProps{
  text : string;
  closePopup : () => void;
  bookings : BookingsRequests;
  requests : BookingsRequests;
  ride : RideDetails;
  cancelRide : (id : string) => void;
  cancelBookingDriver : (id : string) => void;
  confirmRideDriver : (id : string, flag : boolean) => void;
}
interface MyState{
    showTab : number;
}
class Popup extends React.Component<MyProps, MyState>{
    constructor(props) {
        super(props);
    
        this.state = { 
          showTab: 1,
        };
      }
    handleConfirm= (id : string, flag : boolean) =>{
      this.props.closePopup();
      this.props.confirmRideDriver(id, flag);
    }
    handleCancel = (id : string) =>{
      this.props.closePopup();
      this.props.cancelBookingDriver(id)
    }
    render() {
      const id = this.props.ride.id;
      return (
        <Container fluid={true} className="popup">
          <Card className="popup-inner">
            <Row>
              <Col xs="12">
                <button className="close" onClick={this.props.closePopup}><b>X</b></button>
              </Col>
            </Row>
            <Row>
              <Col xs="8">
                <h3>Ride Details</h3>
              </Col>
              <Col xs="4">
                <button className="cancel-ride" onClick={()=> {this.props.cancelRide(id)}}>Cancel</button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">{rideConstants.SourceLabel}</p>
                <p>{this.props.ride.source}</p>
              </Col>
              <Col>
                <p className="label">{rideConstants.DestinationLabel} </p>
                <p>{this.props.ride.destination}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">{rideConstants.SeatsLabel} </p>
                <p>{this.props.ride.seatCount}</p>
              </Col>
              <Col>
                <p className="label">{rideConstants.DateLabel} </p>
                <p>{this.props.ride.date.slice(0,10)}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">{rideConstants.BookingsLabel} </p>
                <p>{this.props.ride.bookingCount}</p>
              </Col>
              <Col>
                <p className="label">{rideConstants.RideRequestsLabel}</p>
                <p>{this.props.ride.requestCount}</p>
              </Col>
            </Row>
            <Row className="tabs">
              <Col xs="4"
                className={`${this.state.showTab === 1 ? "active" : ""}`}
                onClick={() => this.setState({ showTab: 1 })}
              >
                <h3>{rideConstants.BookingsLabel}</h3>
              </Col>

              <Col xs="4"
                className={`${this.state.showTab === 2 ? "active" : ""}`}
                onClick={() => this.setState({ showTab: 2 })}
              >
                <h3>{rideConstants.RideRequestsLabel}</h3>
              </Col>
            </Row>
            {this.state.showTab === 1 ? <Bookings handleCancel={this.handleCancel} bookings={this.props.bookings}/> : <Requests handleConfirm={this.handleConfirm} requests={this.props.requests}/>}
          </Card>
        </Container>
      );
    }
  }
  const mapStateToProps = (state : AppState) =>{
    return{
      bookings : state.rides.bookings,
      requests : state.rides.requests,
      ride : state.rides.ride,
    }
  }
  const mapDispatchToProps = dispatch =>{
    return{
      cancelRide : (id : string) => CancelRide(id),
      cancelBookingDriver : (id : string) => CancelBookingDriver(id),
      confirmRideDriver : (id : string, flag : boolean) => ConfirmRideDriver(id, flag)
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Popup)
  