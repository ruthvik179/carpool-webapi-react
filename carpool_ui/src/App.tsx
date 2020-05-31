import React, { Component } from 'react';
import {Layout} from './Layout';
import {Route} from 'react-router';
import './App.css';
import LoginSignup from './Component/Login-Signup';
import HomePage from './Component/Home/HomePage'
import Loginform from './Component/Login/LoginForm';
import Signup from './Component/Signup/Signup';
import BookingPage from './Component/Booking/BookingPage'
import ProtectedRoute from './Component/ProtectedRoute'
import EditProfile from './Component/EditProfile/EditProfile'
import OfferRide from './Component/Offer/OfferRide'
import RegisterDriver from './Component/RegisterDriver/RegisterDriver'
import Profile from './Component/Profile/Profile';
import ViewRides from './Component/ViewRides/ViewRides';
import { authenticateUserFromToken } from './Redux/Services/AuthenticationServices';
import { connect } from 'react-redux';
interface MyProps {}
export class App extends Component<MyProps>{
  componentDidMount(){
    authenticateUserFromToken();
  }
  render (){
    return(
    <div className="App">
      <Layout>   
        <Route path='/login' component={LoginSignup} />   
        <Route path='/signup' component={LoginSignup} /> 
      </Layout>
      <Route path={["/home", "/book", "/offer", "/rides", "/registerdriver", "/profile"]} render={props => <Profile />}/>
      <ProtectedRoute  exact path ="/home" component = {HomePage} /> 
      <Route exact path="/login" render={props => <Loginform />} />
      <Route exact path="/signup" render={props => <Signup />} />
      <ProtectedRoute  exact path ="/book" component = {BookingPage} /> 
      <ProtectedRoute  exact path ="/offer" component = {OfferRide}  /> 
      <ProtectedRoute  exact path ="/registerdriver" component = {RegisterDriver} /> 
      <ProtectedRoute  exact path ="/rides" component = {ViewRides} /> 
      <ProtectedRoute  exact path ="/profile" component ={EditProfile} />
    </div>
    );
  };
}
const mapDispatchToProps = dispatch =>{
  return{
    authenticateUserFromToken : () => dispatch(authenticateUserFromToken())
  };
}

export default connect(mapDispatchToProps)(App);
