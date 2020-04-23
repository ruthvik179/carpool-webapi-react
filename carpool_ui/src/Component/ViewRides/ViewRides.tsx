import React, { Component } from 'react';
import SearchResult from '../SearchCard/SearchCard';
import Popup from './Popup'
import { Alert, Collapse } from 'reactstrap';
import { stringify } from 'querystring';
import { CSSTransition } from 'react-transition-group';
interface values{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price ?: number;
    distance ?: number;
    seatCount : number;
    id : string;
    status ?: string;
    cancellationCharges? : number;
  }
export interface MyInterface extends Array<values> { }
export interface array extends Array<any> { }
interface ride{
  id : string;
  name : string;
  source : string;
  destination : string;
  time : string; 
  date : string;
  seatCount : number; 
  bookingCount: number;  
  requestCount: number;  
}
  interface MyState{
      OfferRides : MyInterface;
      BookedRides : MyInterface;
      RideRequests : MyInterface;
      bookings : array;
      requests : array;
      ride : ride;
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
        fetch(`https://localhost:44347/api/rider/getrequests`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          }
        })
          .then(res => res.json())
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
        fetch(`https://localhost:44347/api/driver/getrides`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          }
        })
          .then(res => res.json())
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
        fetch(`https://localhost:44347/api/rider/getbookings`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          }
        })
          .then(res => res.json())
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
      fetch(`https://localhost:44347/api/driver/getridedetails?rideId=${Id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
      })
        .then((res) => res.json())
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
      fetch(`https://localhost:44347/api/driver/cancelride`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(id)
      })
        .then(res => res.json())
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
      fetch(`https://localhost:44347/api/rider/cancelrequest`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(id)
      })
        .then((res) => res.json())
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
      fetch(`https://localhost:44347/api/rider/cancelbooking`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(id)
      })
        .then(res => res.json())
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
                    {this.state.OfferRides.map((val: values, i: number) => {
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
                    {this.state.BookedRides.map((val: values, i: number) => {
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
                    />
                    )})}
                  </Collapse>               
              </div>
              <div className="ride requested-rides">
                <button onClick={() => this.toggle("isRequestedRidesOpen", this.state.isRequestedRidesOpen)} className="heading">Requested Rides</button>
                  <Collapse isOpen={this.state.isRequestedRidesOpen}>
                    {this.state.RideRequests.map((val: values, i: number) => {
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
              {this.state.showPopup ? 
                <Popup 
                cancelRide={this.handleCancelRide} 
                ride={this.state.ride} 
                bookings={this.state.bookings} 
                requests={this.state.requests} 
                text={"Test"} 
                closePopup={this.handleClose}
                />
                : null
              } 
          </div>
          {this.state.success ? <Alert id="alert" color="success">{this.state.alert}</Alert> : null}
        </React.Fragment>
      )
    }
}

export default ViewRides




