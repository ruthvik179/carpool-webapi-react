import React, { useState } from 'react';
import { Col } from 'reactstrap';
import './../../Styles/style.scss';
import { Redirect } from 'react-router';

interface MyProps{
  login : () => void
}
export default function Loginform (this: any,props : MyProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValidation] = useState(false);
  const handleSubmit = (event : any) => {
    event.preventDefault();
    const data = {
      Email : email,
      Password : password,
    }
    fetch('https://localhost:44347/api/auth/Login', {
      method: 'POST',
      headers :{
        "Content-Type" : "application/json",
        "Accept" : "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(res => {
    console.log(res);
    if(!res.status)
    {
      if (res.token) {
        window.localStorage.setItem("authToken", res.token);
        window.localStorage.setItem("user", JSON.stringify(res.user))
        props.login();
      }
      console.log(localStorage.authToken);
    }
    else if(res.status !== 200)
    {
      setValidation(true);
    }
    }).catch(e => {
    console.log(e);
    return false;
    });
  }
  return localStorage.authToken === undefined || localStorage.authToken === null ? (
      <Col className="overlay-login" xs="4">
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1>Log In</h1>
              <hr className="centre-line"></hr>
              {valid ? <p className="error">Incorrect Username or Password</p> : null }
              <input className ="form-field" type="text" onChange={e => setEmail(e.target.value)} name="Email" placeholder="Email"/>
              <input className ="form-field" type="password" onChange={e => setPassword(e.target.value)} name="Password" placeholder="Password"/>
              <button type="submit" className="login-button"onClick={e => handleSubmit(e)}>Login</button>
              <p className="message">Not registered? <a href="./signup">SIGN UP!</a></p>
              <hr className="side-line"></hr>
            </form>
          </div>
        </div>
      </Col>
  ): ( <Redirect to="/home"/>);
}

