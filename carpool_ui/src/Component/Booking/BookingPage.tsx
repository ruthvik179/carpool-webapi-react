import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';
import RideForm from './../RideForm/RideForm'
import './../../Styles/style.scss';
import SearchResult from "./../SearchCard/SearchCard"
import { CSSTransition } from 'react-transition-group';
import { RideMatch } from '../../Interfaces/Booking/RideMatch';
import Loading from '../Loading/Loading';
import { Place } from '../../Interfaces/Booking/Place';
import { GetRideMatches, RequestRide } from '../../Redux/Services/BookingServices';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/rootreducer';
export interface RideMatches extends Array<RideMatch>{}
interface MyProps{
  getRideMatches : (source : Place, destination : Place, date : string, time :string) => void,
  requestRide : (id : string ) => void,
  alert : string,
  alertType : string,
  searchResults : RideMatches
}
interface MyState{
    source : Place;
    destination : Place;
    date : string;
    time : string;
    formError: string;
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
            formError : "",
            date: "",
            time: "",
            loading : false
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
          formError : "Please fill all the fields"
        });
      }
      else{
        this.props.getRideMatches(this.state.source, this.state.destination, this.state.date, this.state.time)
      }
      this.setState({
        loading : false
      })
    };
    handleRequest = (id : string) => {
      this.setState({
        loading : true
      })
      this.props.requestRide(id);
      this.setState({
        loading : false
      })
    }
    render(){
        const values = {
            source : this.state.source,
            destination : this.state.destination,
            date : this.state.date,
            time : this.state.time,
        }
        const Price = {
          amount : 2000,
          cgst : 150,
          sgst : 150,
          driverDiscount : 100,
          appDiscount : 200,
          total : 2200,
          cancellationCharges : 0
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
        <Container fluid={true} className="book bg">
            <RideForm 
            Heading={'Book A Ride'} 
            handleChange = {this.handleChange} 
            handlePlaceChange={this.handlePlaceChange} 
            values={values} 
            handleSubmit={this.handleSubmit}
            error={this.state.formError}
            />
            <div className="result-container">
                {this.props.searchResults.length > 0 ?    
                <div className="matches">
                    <h1>Your Matches!</h1>
                </div> : null}
                {this.props.searchResults ? 
                this.props.searchResults.map((val: RideMatch, i: number) => {
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
const mapStateToProps = (state : AppState) =>{
  return{
      alert : state.booking.alert,
      alertType : state.booking.alertType,
      searchResults : state.booking.searchResults
  }
}
const mapDispatchToProps = dispatch =>{
  return{
      getRideMatches: (source : Place, destination : Place, date : string, time :string)=> dispatch(GetRideMatches(source, destination, date, time)),
      requestRide : (id : string) => dispatch(RequestRide(id))
  };
}
export default connect(mapStateToProps , mapDispatchToProps)(Book);