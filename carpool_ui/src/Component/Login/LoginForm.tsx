import React, {Component } from 'react';
import {connect} from 'react-redux'
import { Col } from 'reactstrap';
import './../../Styles/style.scss';
import { Redirect } from 'react-router';
import { UserDetailsConstants } from '../../Constants/UserDetailsConstants';
import { LoginPageConstants } from '../../Constants/LoginPageConstants';
import { authenticateUser } from '../../Redux/Services/AuthenticationServices';
var userDetailsConstants = new UserDetailsConstants();
var loginPageConstants = new LoginPageConstants();
interface MyProps{
  userAuthentication: (username : string,password : string) => void;
  isAuthenticated : boolean;
  error : string;
}
interface MyState{
  email : string;
  password : string
}
export class LoginForm extends Component <MyProps,MyState> {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : ""
    }
  }
  handleChange = (event: { target: { name: any;  value: any}; }): void => {
    const key = event.target.name;
    const value = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({[key]: value } as Pick<MyState, keyof MyState>);
    }
  }
  handleSubmit = (event : any) => {
    event.preventDefault();
    this.props.userAuthentication(this.state.email,this.state.password); 
  }
  render() {
    return !this.props.isAuthenticated ? (
        <Col className="overlay-login" xs="4">
          <div className="login-page">
            <div className="form">
              <form className="login-form" onSubmit={this.handleSubmit}>
                <h1>{loginPageConstants.LoginLabel}</h1>
                <hr className="centre-line"></hr>
                {this.props.error !== ""? <p className="error">{this.props.error}</p> : null }
                <input className ="form-field" type="text" onChange={e => this.handleChange(e)} name="email" placeholder={userDetailsConstants.EmailLabel}/>
                <input className ="form-field" type="password" onChange={e => this.handleChange(e)} name="password" placeholder={userDetailsConstants.PasswordLabel}/>
                <button type="submit" className="login-button"onClick={e => this.handleSubmit(e)}>{loginPageConstants.LoginLabel}</button>
                <p className="message">{loginPageConstants.NotAUserLabel} <a href="./signup">{userDetailsConstants.SignupLabel}!</a></p>
                <hr className="side-line"></hr>
              </form>
            </div>
          </div>
        </Col>
    ): ( <Redirect to="/home"/>);
  }
}
const mapStateToProps = state =>{
  return{
      isAuthenticated : state.authenticate.isAuthenticated,
      error : state.authenticate.error
  }
}

const mapDispatchToProps = dispatch =>{
   return{
       userAuthentication: (username : string,password : string)=> dispatch(authenticateUser(username,password))
   };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
