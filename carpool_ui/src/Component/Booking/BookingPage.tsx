import React, { Component } from 'react';
import history from './../../history'
import { Container } from 'reactstrap';
import RideForm from './../RideForm/RideForm'
import './../../Styles/style.scss';
import SearchResult from "./../SearchCard/SearchCard"
interface MyProps{
  
}
export interface Matches extends Array<values> { }
interface MyState{
    source : any;
    destination : any;
    date : string;
    time : string;
    searchResults : Matches;
    error: string,
    distance : number
}
interface values{
  name : string;
  source : string;
  destination: string;
  date : string;
  time : string;
  price : number;
  distance : number;
  seatCount : number;
  id : string;
}
export class Book extends Component<MyProps, MyState> {
    constructor(props: MyProps){
        super(props)
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
            date: "",
            time: "",
            searchResults : [],
            error : "",
            distance : 0
        }
    }
    // initMap =(srcLat, srcLng, dstLat, dstLng) => {
    //   const srcLocation = new google.maps.LatLng(srcLat, srcLng);
    //   const dstLocation = new google.maps.LatLng(dstLat, dstLng);
    //   var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation)
    //   console.log(distance/1000); // Distance in Kms.
    //   return distance/1000;
    // }
    handleChange = (event: { target: { name: any; value: any; }; } , ): void => {
        const key = event.target.name;
        const value = event.target.value;
        if (Object.keys(this.state).includes(key)) {
          this.setState({[key]: value } as Pick<MyState, keyof MyState>);
          console.log(value);
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
    handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if((this.state.source.lat === 0 && this.state.source.lng === 0) ||
        (this.state.destination.lat === 0 && this.state.destination.lng === 0) ||
        this.state.date === "" || 
        this.state.time === "" ){
        this.setState({
          error : "Please fill all the fields"
        });
      }
      else{
          var srcLocation = new google.maps.LatLng(this.state.source.lat, this.state.source.lng);
          var dstLocation = new google.maps.LatLng(this.state.destination.lat, this.state.destination.lng);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation)
          console.log(distance/1000)
          this.setState({
            distance : distance/1000
          })
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
            Time : this.state.time,
            Distance : distance/1000
          };
          console.log(JSON.stringify(data));
        fetch(`https://localhost:44347/api/rider/getridematches`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(
            (res) => {
              this.setState({
                  searchResults : res.matches,
              })
            }
          )
          .catch(err => console.log(err));
      }
    };
    handleRequest = (Id : string) => {
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
        Time : this.state.time,
        Distance : this.state.distance,
        RideId : Id
      };
      console.log(data);
      fetch(`https://localhost:44347/api/rider/requestride`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(
            () => {
                history.push('/rides');
              }
          )
          .catch(err => console.log(err));
    }
    render(){
        const values = {
            source : this.state.source,
            destination : this.state.destination,
            date : this.state.date,
            time : this.state.time,
        }
          
    return (
        <Container fluid={true} className="book">
            <RideForm 
            Heading={'Book A Ride'} 
            handleChange = {this.handleChange} 
            handlePlaceChange={this.handlePlaceChange} 
            values={values} 
            handleSubmit={this.handleSubmit}
            error={this.state.error}
            />
            <div className="result-container">
                <div className="matches">
                    <h1>Your Matches!</h1>
                </div>
                {this.state.searchResults ? 
                this.state.searchResults.map((val: values, i: number) => {
                 return(
                  <SearchResult 
                  name={val.name} 
                  source={val.source} 
                  destination={val.destination} 
                  date={val.date} 
                  time={val.time}
                  id = {val.id}
                  distance = {val.distance} 
                  price={val.price} 
                  seats ={val.seatCount}
                  handleRequest = {this.handleRequest}
                  type = "result"
                  />
                )}): null}
            </div>
        </Container>
    );
    }
}
export default Book;