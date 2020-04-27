import React, { Component } from 'react';
import SearchResult from '../SearchCard/SearchCard';
import Popup from './Popup'
import { Alert, Collapse } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import {post, get} from './../../Services/api'
import { rideValues } from '../../Interfaces/rideValues';
import { rideDetails } from '../../Interfaces/rideDetails';
import { bookings_requests } from '../../Interfaces/bookings_requests';
import { rideValue } from '../../Interfaces/rideValue';
  interface MyState{
      OfferRides : rideValues;
      BookedRides : rideValues;
      RideRequests : rideValues;
      bookings : bookings_requests;
      requests : bookings_requests;
      ride : rideDetails;
      showPopup : boolean;
      success : boolean;
      failure : boolean;
      alert : string;
      isOfferedRidesOpen : boolean;
      isBookedRidesOpen : boolean;
      isRequestedRidesOpen : boolean;
  }

export class ViewRides extends Component<{},MyState> {
    constructor(props) {
        super(props);
        this.state = {
            OfferRides : [],
            BookedRides : [],
            RideRequests : [],
            bookings: [],
            requests: [],
            ride : {
              id : "",
              name : "",
              source : "",
              destination : "",
              time : "",
              date : "",
              seatCount : 0,
              bookingCount: 0,  
              requestCount: 0,  
            },
            showPopup : false,
            success : false,
            failure : false,
            alert : "",
            isOfferedRidesOpen : false,
            isBookedRidesOpen : false,
            isRequestedRidesOpen : false,
        };
        
    }
    componentDidMount(){
        this.GetOfferRides();
        this.GetRideRequests();
        this.GetBookedRides();
    }
    GetRideRequests(){
        get(`https://localhost:44347/api/rider/getrequests`)
          .then(
            (res) => {
              this.setState({
                  RideRequests : res.requests,
              })
            }
          )
          .catch(err => console.log(err));
    }
    GetOfferRides(){
        get(`https://localhost:44347/api/driver/getrides`)
          .then(
            (res) => {
              this.setState({
                  OfferRides : res.matches,
              })
            }
          )
          .catch(err => console.log(err));
    }
    GetBookedRides(){
        get(`https://localhost:44347/api/rider/getbookings`)
          .then(
            (res) => {
              this.setState({
                  BookedRides : res.bookings,
              })
            }
          )
          .catch(err => console.log(err));
    }
    handleClose = () => {
      this.setState({
        showPopup: false
      });
    }
    handleClick = (Id : string) => {
      console.log(Id);
      this.setState({
        showPopup: true
      });
      get(`https://localhost:44347/api/driver/getridedetails?rideId=${Id}`)
        .then((res) =>
          this.setState({
            bookings: res.bookings,
            requests: res.requests,
            ride: res.ride,
          })
        ).then(res => console.log(res))
        .catch((err) => console.log(err));
    }
    handleCancelRide = (id : string) => {
      this.setState({
        showPopup: false
      });
       post(`https://localhost:44347/api/driver/cancelride`, id )
        .then(res =>{
          console.log(res)
          if(res.message){
            this.setState({
                success : true,
                alert : res.message
            })
            setTimeout(() => {
              this.setState({
                  success: false
              })
            }, 2000);
          }
          else{
            this.setState({
              failure : true,
              alert : "res.error"
            })
            setTimeout(() => {
              this.setState({
                  failure: false,
              })
            }, 2000);
          }
        })
        .catch(err => console.log(err));
    }
    handleCancelRequest = (id : string) => {
      post(`https://localhost:44347/api/rider/cancelrequest`, id)
        .then(res =>console.log(res))
        .then((res : any) => {
          if(res.message){
            this.setState({
                success : true,
                alert : "res.message"
            })
            setTimeout(() => {
              this.setState({
                  success: false
              })
            }, 2000);
          }
          else{
            this.setState({
              failure : true,
              alert : "res.error"
            })
            setTimeout(() => {
              this.setState({
                  failure: false,
              })
            }, 2000);
          }
        })
        .catch(err => console.log(err));

    }
    handleCancelBooking = (id : string) => {
      post(`https://localhost:44347/api/rider/cancelbooking`, id)
        .then((res) => {
          if(res.message){
            this.setState({
                success : true,
                alert : "res.message"
            })
            setTimeout(() => {
              this.setState({
                  success: false
              })
            }, 2000);
          }
          else{
            this.setState({
              failure : true,
              alert : "res.error"
            })
            setTimeout(() => {
              this.setState({
                  failure: false,
              })
            }, 2000);
          }
        })
        .catch(err => console.log(err));
    }
    toggle = (key : string, value: boolean) => { 
        if (Object.keys(this.state).includes(key)) {
          this.setState({[key]: !value } as unknown as Pick<MyState, keyof MyState>);
        }
    }
    showPopup = () => {
      return ( 
      <Popup 
        cancelRide={this.handleCancelRide} 
        ride={this.state.ride} 
        bookings={this.state.bookings} 
        requests={this.state.requests} 
        text={"Test"} 
        closePopup={this.handleClose}
        />
        )
    }
    render() {
        return (
          <React.Fragment>
            <CSSTransition
            in={this.state.success}
            timeout={350}
            classNames="display"
            unmountOnExit
            >
              <Alert id="alert" color="success">{this.state.alert}</Alert> 
            </CSSTransition>
            <div className="rides-container bg">
              <div className="ride offered-rides">
                  <button onClick={() => this.toggle("isOfferedRidesOpen", this.state.isOfferedRidesOpen)} className="heading">Offered Rides</button>
                  <Collapse isOpen={this.state.isOfferedRidesOpen}>
                    {this.state.OfferRides.map((val: rideValue, i: number) => {
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
                    {this.state.BookedRides.map((val: rideValue, i: number) => {
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
                    cancellationCharges ={val.cancellationCharges}
                    sgst = {val.sgst}
                    cgst = {val.cgst}
                    />
                    )})}
                  </Collapse>               
              </div>
              <div className="ride requested-rides">
                <button onClick={() => this.toggle("isRequestedRidesOpen", this.state.isRequestedRidesOpen)} className="heading">Requested Rides</button>
                  <Collapse isOpen={this.state.isRequestedRidesOpen}>
                    {this.state.RideRequests.map((val: rideValue, i: number) => {
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
          {this.state.success ? <Alert id="alert" color="success">{this.state.alert}</Alert> : null}
        </React.Fragment>
      )
    }
}

export default ViewRides




