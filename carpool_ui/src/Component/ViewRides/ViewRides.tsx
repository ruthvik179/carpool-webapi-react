import React, { Component } from 'react';
import SearchResult from '../SearchCard/SearchCard';
import Popup from './Popup'
import { Alert, Collapse } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { RideDetails } from '../../Interfaces/ViewRides/RideDetails';
import { RideValue } from '../../Interfaces/ViewRides/RideValue';
import { BookingRequest } from '../../Interfaces/ViewRides/BookingRequest';
import { AppState } from '../../Redux/rootreducer';
import { connect } from 'react-redux';
import { GetRideDetails, GetOfferRides, GetBookedRides, GetRideRequests, CancelRide, CancelBookingRider, CancelRideRequestRider } from '../../Redux/Services/ViewRidesServices';

export interface BookingsRequests extends Array<BookingRequest> { }
export interface RideValues extends Array<RideValue> { }
interface MyProps {
  OfferRides : RideValues;
  BookedRides : RideValues;
  RideRequests : RideValues;
  bookings : BookingsRequests;
  requests : BookingsRequests;
  ride : RideDetails;
  alert : string;
  alertType : string;
  getOfferRides : () => void;
  getBookedRides : () => void;
  getRideRequests : () => void;
  getRideDetails : (id : string) => void;
  cancelRide : (id : string) => void;
  cancelBooking : (id : string) => void;
  cancelRideRequest : (id : string) => void;
}
interface MyState{
    showPopup : boolean;
    isOfferedRidesOpen : boolean;
    isBookedRidesOpen : boolean;
    isRequestedRidesOpen : boolean;
}

export class ViewRides extends Component<MyProps,MyState> {
    constructor(props) {
        super(props);
        this.state = {
            showPopup : false,
            isOfferedRidesOpen : false,
            isBookedRidesOpen : false,
            isRequestedRidesOpen : false,
        };
        
    }
    componentDidMount(){
        this.props.getOfferRides();
        this.props.getRideRequests();
        this.props.getBookedRides();
    }
    handleClose = () => {
      this.setState({
        showPopup: false
      });
    }
    handleClick = (id : string) => {
      this.setState({
        showPopup: true
      });
      this.props.getRideDetails(id);
    }
    handleCancelRide = (id : string) => {
      this.setState({
        showPopup: false
      });
       this.props.cancelRide(id);
    }
    handleCancelRequest = (id : string) => {
      this.props.cancelRideRequest(id);
    }
    handleCancelBooking = (id : string) => {
      this.props.cancelBooking(id);
    }
    toggle = (key : string, value: boolean) => { 
        if (Object.keys(this.state).includes(key)) {
          this.setState({[key]: !value } as unknown as Pick<MyState, keyof MyState>);
        }
    }
    showPopup = () => {
      return ( 
      <Popup 
        text={"Test"} 
        closePopup={this.handleClose}
        />
        )
    }
    render() {
        return (
          <React.Fragment>
            <CSSTransition
            in={this.props.alert !== ''? true : false}
            timeout={350}
            classNames="display"
            unmountOnExit
            >
              <Alert id="alert" color={this.props.alertType}>{this.props.alert}</Alert> 
            </CSSTransition>
            <div className="rides-container bg">
              <div className="ride offered-rides">
                  <button onClick={() => this.toggle("isOfferedRidesOpen", this.state.isOfferedRidesOpen)} className="heading">Offered Rides</button>
                  <Collapse isOpen={this.state.isOfferedRidesOpen}>
                    {this.props.OfferRides.map((val: RideValue, i: number) => {
                    return(
                    <SearchResult 
                    name={val.name} 
                    source={val.source} 
                    destination={val.destination}
                    date={val.date} 
                    time={val.time} 
                    price={val.price} 
                    seats ={val.seatCount}
                    id = {val.id}
                    handleClick = {this.handleClick}
                    type = "offer"
                    />
                    )})}  
                  </Collapse>             
              </div>
              <div className="ride booked-rides">
                  <button onClick={() => this.toggle("isBookedRidesOpen", this.state.isBookedRidesOpen)} className="heading">Booked Rides</button>
                  <Collapse isOpen={this.state.isBookedRidesOpen}>
                    {this.props.BookedRides.map((val: RideValue, i: number) => {
                    return(
                    <SearchResult 
                    name={val.name} 
                    source={val.source} 
                    destination={val.destination}
                    date={val.date} 
                    time={val.time} 
                    price={val.price} 
                    seats ={val.seatCount}
                    id = {val.id}
                    type="booking"
                    status={val.status}
                    handleButton = {this.handleCancelBooking}
                    />
                    )})}
                  </Collapse>               
              </div>
              <div className="ride requested-rides">
                <button onClick={() => this.toggle("isRequestedRidesOpen", this.state.isRequestedRidesOpen)} className="heading">Requested Rides</button>
                  <Collapse isOpen={this.state.isRequestedRidesOpen}>
                    {this.props.RideRequests.map((val: RideValue, i: number) => {
                    return(
                    <SearchResult 
                    name={val.name} 
                    source={val.source} 
                    destination={val.destination}
                    date={val.date} 
                    time={val.time} 
                    price={val.price} 
                    seats ={val.seatCount}
                    id = {val.id}
                    type="request"
                    status={val.status}
                    handleButton = {this.handleCancelRequest}
                    />
                    )})} 
                  </Collapse>               
              </div> 
              {this.state.showPopup ?this.showPopup() : null} 
          </div>
        </React.Fragment>
      )
    }
}
const mapStateToProps = (state : AppState) =>{
  return{
      OfferRides : state.rides.OfferRides,
      BookedRides : state.rides.BookedRides,
      RideRequests : state.rides.RideRequests,
      alert : state.rides.alert,
      alertType : state.rides.alertType
  };
}
const mapDispatchToProps = dispatch =>{
  return{
      getRideDetails : (id : string) => dispatch(GetRideDetails(id)),
      getOfferRides : () => dispatch(GetOfferRides()),
      getBookedRides : () => dispatch(GetBookedRides()),
      getRideRequests : () => dispatch(GetRideRequests()),
      cancelBooking : (id : string) => dispatch(CancelBookingRider(id)),
      cancelRideRequest : (id : string) => dispatch(CancelRideRequestRider(id))

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewRides)




