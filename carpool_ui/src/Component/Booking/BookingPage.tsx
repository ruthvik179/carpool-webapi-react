import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';
import RideForm from './../RideForm/RideForm'
import './../../Styles/style.scss';
import SearchResult from "./../SearchCard/SearchCard"
import { CSSTransition } from 'react-transition-group';
import { ApiConnection } from '../../Services/ApiConnection'
import { Match } from '../../Interfaces/Booking/Match';
import Loading from '../Loading/Loading';
import { Urls } from '../../Constants/Urls';
export interface Matches extends Array<Match>{}
var api = new ApiConnection();
var url = new Urls();
interface MyProps{
  
}
interface MyState{
    source : any;
    destination : any;
    date : string;
    time : string;
    submittedSource : any;
    submittedDestination : any;
    submittedDate : string;
    submittedTime : string;
    searchResults : Matches;
    error: string,
    distance : number,
    success : boolean;
    loading : boolean;
}

export class Book extends Component<MyProps, MyState> {
    constructor(props: MyProps){
        super(props)
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
            date: "",
            time: "",
            submittedSource: {
              name: "",
              lat: 0,
              lng: 0,
              id : ""
            },
            submittedDestination: {
              name: "",
              lat: 0,
              lng: 0,
              id : ""
            },
            submittedDate: "",
            submittedTime: "",
            searchResults : [],
            error : "",
            distance : 0,
            success : false,
            loading : false,
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
      console.log(place)
        if (type === "source") {
          this.setState({
            source: {
              name: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              id : place.place_id
            }
          });
        } else {
          this.setState({
            destination: {
              name: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              id : place.place_id
            }
          });
        }
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
          error : "Please fill all the fields"
        });
      }
      else{
        this.setState({
          submittedSource: {
            name: this.state.source.name,
            lat: this.state.source.lat,
            lng: this.state.source.lng,
            id : this.state.source.id
          },
          submittedDestination: {
            name: this.state.destination.name,
            lat: this.state.destination.lat,
            lng: this.state.destination.lng,
            id : this.state.destination.id
          },
          submittedDate: this.state.date,
          submittedTime: this.state.time
        });
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
              Longitude: this.state.source.lng,
              Id: this.state.source.id
            },
            Destination: {
              Name: this.state.destination.name,
              Latitude: this.state.destination.lat,
              Longitude: this.state.destination.lng,
              Id: this.state.destination.id
            },
            Date: this.state.date,
            Time : this.state.time,
            Distance : distance/1000
          };
          console.log(JSON.stringify(data));
        api.post(url.GetRideMatches, data)
          .then(
            (res) => {
              this.setState({
                  searchResults : res.matches,
                  loading : false
              })
            }
          )
          .catch(err => console.log(err));
      }
    };
    handleRequest = (id : string) => {
      this.setState({
        loading : true
      })
      const data = {
        Source: {
          Name: this.state.submittedSource.name,
          Latitude: this.state.submittedSource.lat,
          Longitude: this.state.submittedSource.lng,
          Id: this.state.submittedSource.id
        },
        Destination: {
          Name: this.state.submittedDestination.name,
          Latitude: this.state.submittedDestination.lat,
          Longitude: this.state.submittedDestination.lng,
          Id: this.state.submittedDestination.id
        },
        Date: this.state.submittedDate,
        Time : this.state.submittedTime,
        Distance : this.state.distance,
        RideId : id
      };
      console.log(data);
      api.post(url.RequestRide, data)
      .then(res => console.log(res))
      .then(() => {
        this.setState({
          success : true,
          loading : false
        })
        setTimeout(() => {
          this.setState({
              success: false,
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
          
    return this.state.loading ? <Loading/> : (
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
                {this.state.searchResults.length > 0 ?  
                <div className="matches">
                    <h1>Your Matches!</h1>
                </div> : null}
                {this.state.searchResults ? 
                this.state.searchResults.map((val: Match, i: number) => {
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