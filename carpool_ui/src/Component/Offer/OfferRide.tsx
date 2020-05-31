import React, { Component } from "react";
import GeneratePage from "./GeneratePage";
import { Alert } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Loading from "../Loading/Loading";
import { Place, ViaPoints } from "../../Interfaces/Booking/Place";
import { connect } from "react-redux";
import {CreateRide} from "../../Redux/Services/OfferServices"
import { AppState } from "../../Redux/rootreducer";
interface MyProps{
  alert : string;
  alertType : string;
  createRide : (source : Place, destination : Place, date : string, viaPoints : ViaPoints, time : string, seats : number) => void;
}
interface MyState{
    source : Place;
    destination : Place;
    next : boolean;
    viaPoints : ViaPoints;
    date : string;
    seats : number;
    time : string;
    error1 : string;
    error2 : string;
    loading : boolean;
}
export class OfferRide extends Component<MyProps, MyState> {
  constructor(props : MyProps) {
    super(props);
    this.state = {
      source: {
        name: "",
        lat: 0,
        lng: 0,
        id : ""
      },
      destination: {
        name: "",
        lat: 0,
        lng: 0,
        id : ""
      },
      viaPoints: [
        {
          name: "",
          lat: 0,
          lng: 0,
          id : ""
        }
      ],
      
      date: "",
      seats: 0,
      next: false,
      time: "",
      error1: "",
      error2: "",
      loading: false
    };
  }
  next= () => {
    if((this.state.source.lat === 0 && this.state.source.lng === 0) ||
     (this.state.destination.lat === 0 && this.state.destination.lng === 0) ||
      this.state.date === "" || 
      this.state.time === "" ){
      this.setState({
        error1 : "Please fill all the fields"
      });
    }
    else{
      this.setState({
        next: true,
        error1 : ""
      });
    }
  };
  handleChange = (event: { target: { name: any;  value: any}; }): void => {
    const key = event.target.name;
    const value = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({[key]: value } as Pick<MyState, keyof MyState>);
    }
  }
  handlePlaceChange = (type : string, place : any) => {
    if (type === "source") {
      this.setState({
        source: {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          id: place.place_id,
        }
      });
    } else {
      this.setState({
        destination: {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          id: place.place_id,
        }
      });
    }
  };
  handleViaPointChange = (place : any, index : number) => {
    const viaPointsClone = this.state.viaPoints;
    viaPointsClone[index].name = place.formatted_address;
    viaPointsClone[index].lat = place.geometry.location.lat();
    viaPointsClone[index].lng = place.geometry.location.lng();
    viaPointsClone[index].id = place.place_id;
    this.setState({
      viaPoints: viaPointsClone
    });
  };
  addViaPoint = () => {
    const viaPointsClone = this.state.viaPoints.concat({
      name: "",
      lat: 0,
      lng: 0,
      id : ""
    });

    this.setState({
      viaPoints: viaPointsClone,
    });
  };
  deleteViaPoint = (index: number) => {
    const viaPointsClone = this.state.viaPoints;
    viaPointsClone.splice(index, 1);
    this.setState({
      viaPoints: viaPointsClone
    });
  };
  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.setState({
      loading : true
    })
    if((this.state.source.lat === 0 && this.state.source.lng === 0) ||
     (this.state.destination.lat === 0 && this.state.destination.lng === 0) ||
      this.state.date === "" || 
      this.state.time === "" ){
      this.setState({
        error1 : "Please fill all the fields"
      });
    }
    else if(this.state.seats === 0){
      this.setState({
        error2 : "Please enter number of seats in the car"
      })
    }
    else{
      this.props.createRide(this.state.source, this.state.destination, this.state.date, this.state.viaPoints, this.state.time, this.state.seats);
    }
    this.setState({
      loading : false
    })
  };
  render(){
    const values = {
      source : this.state.source,
      destination : this.state.destination,
      viaPoints : this.state.viaPoints,
      seats : this.state.seats,
      date : this.state.date,
      time : this.state.time,
    } 
    
      return this.state.loading ? <Loading/> : (
        
        <React.Fragment>
          <CSSTransition
          in={this.props.alert !== '' ? true : false}
          timeout={350}
          classNames="display"
          unmountOnExit
          >
            <Alert id="alert" color={this.props.alertType}>{this.props.alert}</Alert> 
          </CSSTransition>
          
          <GeneratePage 
          nextValue = {this.state.next}
          next={this.next} 
          values = {values} 
          handleChange={this.handleChange} 
          handlePlaceChange={this.handlePlaceChange} 
          handleViaPointChange={this.handleViaPointChange}
          addViaPoint={this.addViaPoint}
          deleteViaPoint={this.deleteViaPoint}
          handleSubmit={this.handleSubmit}
          error1 = {this.state.error1}
          error2 = {this.state.error2}
          />
        </React.Fragment>
      );

  }
}
const mapStateToProps = (state : AppState) =>{
  return{
      alert : state.offer.alert,
      alertType : state.offer.alertType,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
      createRide : (source : Place, destination : Place, date : string, viaPoints : ViaPoints, time : string, seats : number)=> dispatch(CreateRide(source, destination, date, viaPoints, time, seats)),
  };
}
export default connect(mapStateToProps ,mapDispatchToProps)(OfferRide)