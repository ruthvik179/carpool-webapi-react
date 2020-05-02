import React from 'react';
import {Card } from 'reactstrap';
import { UserDetails } from '../Interfaces/UserDetails';
import {UserDetailsConstants} from '../Constants/UserDetailsConstants'
var userDetailsConstants = new UserDetailsConstants();
interface MyProps{
    handleSubmit : (e: { preventDefault: () => void; }) => void
    heading : string
    error : string
    handleChange : (event: { target: { name: any; value: any; }; } ) => void
    defaultValues : UserDetails
    signup : boolean
}

function UserDetailsForm(props : MyProps) {
    return (
    <Card className="form">
        <form className="user-details-form ">
        <h1>{props.heading}</h1>
        <hr className="centre-line"></hr>
        {props.error ? <p className="error">{props.error}</p> : null }
        <div>
          <label htmlFor="License">{userDetailsConstants.NameLabel}</label>
          <input className ="form-field" type="text" name="name" defaultValue={props.defaultValues.name} onChange={e => props.handleChange(e) } placeholder={userDetailsConstants.NamePlaceHolder}/>
        </div>
        <div>
          <label htmlFor="License">{userDetailsConstants.PhoneNumberLabel}</label>
          <input className ="form-field" type="text" name="phoneNumber" defaultValue={props.defaultValues.phoneNumber} onChange={e => props.handleChange(e)} placeholder={userDetailsConstants.PhoneNumberPlaceHolder}/>
        </div>
        <div>
          <label htmlFor="License">{userDetailsConstants.EmailLabel}</label>
          <input className ="form-field" type="text" name="email" defaultValue={props.defaultValues.email} onChange={e => props.handleChange(e)}placeholder={userDetailsConstants.EmailPlaceHolder}/>
        </div>
        {props.signup?
        <React.Fragment>
          <div>
            <label htmlFor="License">{userDetailsConstants.PasswordLabel}</label>
            <input className ="form-field" type="password" name="password" onChange={e => props.handleChange(e)} placeholder={userDetailsConstants.PasswordPlaceHolder}/>
          </div>
          <div>
            <label htmlFor="License">{userDetailsConstants.ConfirmPasswordLabel}</label>
            <input className ="form-field" type="password" name="confirmPassword" onChange={e => props.handleChange(e)} placeholder={userDetailsConstants.ConfirmPasswordPlaceHolder}/>
          </div>
        </React.Fragment>
        : null
        }
        <button type="submit" className="signup-button" onClick={e => props.handleSubmit(e)}>Submit</button>
        </form>
    </Card>

    );
}

export default UserDetailsForm;