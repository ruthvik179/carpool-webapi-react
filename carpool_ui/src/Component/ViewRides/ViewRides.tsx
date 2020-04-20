import React, { Component } from 'react';
import SearchResult from '../SearchCard/SearchCard';
import Popup from './Popup'
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
  }
export interface MyInterface extends Array<values> { }
export interface rides extends Array<any> { }
interface ride{
  source : string;
  destination: string;
  time: string;
  date: string;
  bookings : number;
  requests : number;
}
  interface MyState{
      OfferRides : MyInterface;
      BookedRides : MyInterface;
      RideRequests : MyInterface;
      bookings : rides;
      requests : rides;
      ride : {};
      showPopup : boolean;
  }

export class ViewRides extends Component<{},MyState> {
    constructor(props) {
        super(props);
        this.state = {
            OfferRides : [
              {
                name : "Ruthvik",
                source : "Warangal" ,
                destination : "Hyderabad",
                date : "14/04/2020",
                time : "6AM - 9AM",
                seatCount : 4,
                id : "123",
              }
            ],
            BookedRides : [
              {
                name : "Ruthvik",
                source : "Warangal" ,
                destination : "Hyderabad",
                date : "14/04/2020",
                time : "6AM - 9AM",
                price : 50,
                seatCount : 4,
                distance : 20,
                id : "123",
              }
            ],
            RideRequests : [
              {
                name : "Ruthvik",
                source : "Warangal" ,
                destination : "Hyderabad",
                date : "14/04/2020",
                time : "6AM - 9AM",
                price : 50,
                seatCount : 4,
                distance : 20,
                id : "123",
              }
            ],
            bookings: [
              {
                  name : "Ruthvik",
                  source : "Warangal" ,
                  destination : "Hyderabad",
                  price : "400",
              }
            ],
            requests: [
              {
                name : "Ruthvik",
                source : "Warangal" ,
                destination : "Hyderabad",
                price : "400",
              }
            ],
            ride : {},
            showPopup : false,
        };
        
    }
    componentDidMount(){
        this.GetOfferRides();
        this.GetRideRequests();
        this.GetBookedRides();
    }
    togglePopup = () => {
      
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
        showPopup: !this.state.showPopup
      });
    }
    handleClick = (Id : string) => {
      console.log(Id);
      this.setState({
        showPopup: !this.state.showPopup
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
    render() {
        return (
            <div className="rides-container">
              <div className="ride">
                  <h1 className="heading">Offered Rides</h1>
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
              </div>
              <div className="ride">
                  <h1 className="heading">Booked Rides</h1>
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
                  />
                  )})}               
              </div>
              <div className="ride">
                  <h1 className="heading">Requested Rides</h1>
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
                  type="booking"
                  status={val.status}
                  />
                  )})}               
              </div> 
              {this.state.showPopup ? 
                <Popup bookings={this.state.bookings} requests={this.state.requests} text={"Test"} closePopup={this.handleClose}/>
                : null
              } 
          </div>
          
        )
    }
}

export default ViewRides




