import React, { Component } from 'react';
import history from './../../history'
import { Container, Alert } from 'reactstrap';
import RideForm from './../RideForm/RideForm'
import './../../Styles/style.scss';
import SearchResult from "./../SearchCard/SearchCard"
import { CSSTransition } from 'react-transition-group';
import { post } from '../../Services/api';
import { matches } from '../../Interfaces/matches';
import { match } from '../../Interfaces/match';
interface MyProps{
  
}
interface MyState{
    source : any;
    destination : any;
    date : string;
    time : string;
    searchResults : matches;
    error: string,
    distance : number,
    success : boolean;
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
            distance : 0,
            success : false,
        }
    }
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
          var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation);
          console.log(distance/1000)
          distance = +distance.toFixed(2);
          this.setState({
            error : "",
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
        post(`https://localhost:44347/api/rider/getridematches`, data)
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
    handleRequest = (id : string) => {
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
        RideId : id
      };
      console.log(data);
      post(`https://localhost:44347/api/rider/requestride`, id)
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
    }
    render(){
        const values = {
            source : this.state.source,
            destination : this.state.destination,
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
          <Alert id="alert" color="success">Ride has been requested succesfully</Alert> 
        </CSSTransition>
        <Container fluid={true} className="book bg">
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
                this.state.searchResults.map((val: match, i: number) => {
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
                  handleButton = {this.handleRequest}
                  type = "result"
                  />
                )}): null}
            </div>
        </Container>
      </React.Fragment>
    );
    }
}
export default Book;