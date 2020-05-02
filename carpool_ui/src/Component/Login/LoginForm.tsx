import React, {Component } from 'react';
import { Col } from 'reactstrap';
import './../../Styles/style.scss';
import { Redirect } from 'react-router';
import { ApiConnection } from '../../Services/ApiConnection'
import { UserDetailsConstants } from '../../Constants/UserDetailsConstants';
import { LoginPageConstants } from '../../Constants/LoginPageConstants';
import { Urls } from '../../Constants/Urls';
var api = new ApiConnection();
var userDetailsConstants = new UserDetailsConstants();
var loginPageConstants = new LoginPageConstants();
var urls = new Urls();
interface MyProps{
  login : () => void
}
interface MyState{
  email : string;
  password : string,
  valid : boolean,
}
export class LoginForm extends Component <MyProps,MyState> {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : "",
      valid : false
    }
  }
  handleChange = (event: { target: { name: any;  value: any}; }): void => {
    const key = event.target.name;
    const value = event.target.value;
    console.log(value);
    if (Object.keys(this.state).includes(key)) {
      this.setState({[key]: value } as Pick<MyState, keyof MyState>);
    }
  }
  handleSubmit = (event : any) => {
    event.preventDefault();
    const data = {
      Email : this.state.email,
      Password : this.state.password,
    }
    api.postWithoutAuth(urls.Login, data)
    .then(res => {
    console.log(res);
    if(!res.status)
    {
      if (res.token) {
        window.localStorage.setItem("authToken", res.token);
        window.localStorage.setItem("user", JSON.stringify(res.user))
        this.props.login();
      }
      console.log(localStorage.authToken);
    }
    else if(res.status !== 200)
    {
      this.setState({valid: true });
    }
    }).catch(e => {
    console.log(e);
    return false;
    });
  }
  render() {
    return localStorage.authToken === undefined || localStorage.authToken === null ? (
        <Col className="overlay-login" xs="4">
          <div className="login-page">
            <div className="form">
              <form className="login-form" onSubmit={this.handleSubmit}>
                <h1>{loginPageConstants.LoginLabel}</h1>
                <hr className="centre-line"></hr>
                {this.state.valid ? <p className="error">{loginPageConstants.LoginError}</p> : null }
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
export default LoginForm
