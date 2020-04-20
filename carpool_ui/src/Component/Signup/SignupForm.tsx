import React from 'react';
import { Col } from 'reactstrap';
interface MyProps{
    handleSubmit : (e: { preventDefault: () => void; }) => void
    heading : string
    error : string
    handleChange : (event: { target: { name: any; value: any; }; } ) => void
    defaultValues : values
    signup : boolean
}
interface values{
    name : string;
    phoneNumber : string;
    email : string;
    password ?: string;
    confirmPassword ?: string;
  }
function SignupForm(props : MyProps) {
    return (
        <Col className="overlay-signup" xs="4">
            <div className="login-page">
            <div className="form">
                <form className="signup-form">
                <h1>{props.heading}</h1>
                <hr className="centre-line"></hr>
                {props.error ? <p className="error">{props.error}</p> : null }
                <div>
                  <label htmlFor="License">Name</label>
                  <input className ="form-field" type="text" name="name" defaultValue={props.defaultValues.name} onChange={e => props.handleChange(e) } placeholder="Enter your Name"/>
                </div>
                <div>
                  <label htmlFor="License">Phone Number</label>
                  <input className ="form-field" type="text" name="phoneNumber" defaultValue={props.defaultValues.phoneNumber} onChange={e => props.handleChange(e)} placeholder="Enter your Phone Number"/>
                </div>
                <div>
                  <label htmlFor="License">Email</label>
                  <input className ="form-field" type="text" name="email" defaultValue={props.defaultValues.email} onChange={e => props.handleChange(e)}placeholder="Enter your Email"/>
                </div>
                {props.signup?
                <React.Fragment>
                  <div>
                    <label htmlFor="License">Pssword</label>
                    <input className ="form-field" type="password" name="password" onChange={e => props.handleChange(e)} placeholder="Enter your Password"/>
                  </div>
                  <div>
                    <label htmlFor="License">Confirm Password</label>
                    <input className ="form-field" type="password" name="confirmPassword" onChange={e => props.handleChange(e)} placeholder="Confirm above Password"/>
                  </div>
                </React.Fragment>
                : null
                }
                <button type="submit" className="signup-button" onClick={e => props.handleSubmit(e)}>Submit</button>
                {props.signup?
                <React.Fragment>
                   <p className="message">Already registered? <a href="./login">Log In!</a></p>
                    <hr className="side-line"></hr>
                </React.Fragment>
                : null
                }
                </form>
            </div>
            </div>
        </Col>
    );
}

export default SignupForm;