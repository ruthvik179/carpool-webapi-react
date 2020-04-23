import React, { Component } from "react";
import GeneratePage from "./GeneratePage";
import history from './../../history'
import { Alert } from "reactstrap";
import { CSSTransition } from "react-transition-group";
export interface viaPoints extends Array<any> { }
interface MyProps{

}
interface MyState{
    source : any;
    destination : any;
    next : boolean;
    viaPoints : viaPoints;
    date : string;
    seats : number;
    time : string;
    error1 : string;
    error2 : string;
    success : boolean;
}
export class OfferRide extends Component<MyProps, MyState> {
  constructor(props : MyProps) {
    super(props);

    this.state = {
      source: {
        name: "",
        lat: 0,
        lng: 0
      },
      destination: {
        name: "",
        lat: 0,
        lng: 0
      },
      viaPoints: [
        {
          name: "",
          lat: 0,
          lng: 0
        }
      ],
      
      date: "",
      seats: 0,
      next: false,
      time: "",
      error1: "",
      error2: "",
      success: false
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
          lng: place.geometry.location.lng()
        }
      });
    } else {
      this.setState({
        destination: {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    }
  };
  handleViaPointChange = (coordinates : any, index : number) => {
    const viaPointsClone = this.state.viaPoints;
    viaPointsClone[index].name = coordinates.formatted_address;
    viaPointsClone[index].lat = coordinates.geometry.location.lat();
    viaPointsClone[index].lng = coordinates.geometry.location.lng();
    this.setState({
      viaPoints: viaPointsClone
    });
  };

  addViaPoint = () => {
    const viaPointsClone = this.state.viaPoints.concat({
      name: "",
      lat: 0,
      lng: 0
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
      const data = {
        Source: {
          Name: this.state.source.name,
          Latitude: this.state.source.lat,
          Longitude: this.state.source.lng
        },
        Destination: {
          Name: this.state.destination.name,
          Latitude: this.state.destination.lat,
          Longitude: this.state.destination.lng
        },
        Date: this.state.date,
        
        ViaPoints: this.state.viaPoints.map(viaPoint => {
          return {
            Name: viaPoint.name,
            Latitude: viaPoint.lat,
            Longitude: viaPoint.lng
          };
        }),
        Time : this.state.time,
        Seats : this.state.seats
      };

      fetch(`https://localhost:44347/api/driver/createride`, {
        method: "Post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(data)
      })
        .then(res => console.log(res))
        .then(() => {
          this.setState({
            success : true
          })
          setTimeout(() => {
            this.setState({
                success: false
            })
         }, 2000);
        })
        .catch(err => console.log(err));
        // .then(
        //   ()=>{history.push("/rides");}
        // );
      }
  };
  alertTimeout = () =>{
    
  }
  render(){
    const values = {
      source : this.state.source,
      destination : this.state.destination,
      viaPoints : this.state.viaPoints,
      seats : this.state.seats,
      date : this.state.date,
      time : this.state.time,
    } 
   
      return (
        <React.Fragment>
          <CSSTransition
          in={this.state.success}
          timeout={350}
          classNames="display"
          unmountOnExit
          >
             <Alert id="alert" color="success">Ride has been offered succesfully</Alert> 
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
export default OfferRide