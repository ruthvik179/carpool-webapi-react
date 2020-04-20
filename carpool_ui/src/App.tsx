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
import history from './history'
import ViewRides from './Component/ViewRides/ViewRides';
interface MyProps {}
interface MyState {
    isAuthenticated: boolean;
}
export class App extends Component<MyProps, MyState>{
  constructor(props : MyProps){
    super(props)
    this.state = {
      isAuthenticated: localStorage.authToken !== undefined ? true : false,
    };
    
    }
    logout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      this.setState({
        isAuthenticated : false,
      })
      history.push('/login')
    }

    login = () => {
    this.setState({
      isAuthenticated : true,
    })
    }
  render (){
    return(
    <div className="App">
      <Layout>   
        <Route path='/login' component={LoginSignup} />   
        <Route path='/signup' component={LoginSignup} /> 
      </Layout>
      <Route path={["/home", "/book", "/offer", "/rides", "/registerdriver", "/profile"]} render={props => <Profile logout={this.logout} />}/>
      {/* <Route path ='/home' component = {Home}/>  */}
      <ProtectedRoute  exact path ="/home" component = {HomePage} auth={this.state.isAuthenticated} /> 
      <Route exact path="/login" render={props => <Loginform login={this.login} />} />
      <Route exact path="/signup" render={props => <Signup login={this.login} />} />
      <ProtectedRoute  exact path ="/book" component = {BookingPage} auth={this.state.isAuthenticated}/> 
      <ProtectedRoute  exact path ="/offer" component = {OfferRide} auth={this.state.isAuthenticated} /> 
      <ProtectedRoute  exact path ="/registerdriver" component = {RegisterDriver} auth={this.state.isAuthenticated}/> 
      <ProtectedRoute  exact path ="/rides" component = {ViewRides} auth={this.state.isAuthenticated}/> 
      <ProtectedRoute  exact path ="/profile" component ={EditProfile} auth={this.state.isAuthenticated}/>
    </div>
    );
  };
}

export default App;
