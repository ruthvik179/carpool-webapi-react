import React, { Component } from 'react'
import './../../Styles/style.scss';
import { Redirect } from 'react-router';
import SignupForm from './SignupForm'
import { postWithoutAuth } from '../../Services/api';
  interface MyState{
    name : string;
    phoneNumber : string;
    email : string;
    password : string;
    confirmPassword : string;
    error : string;
  }
  interface MyProps{
    login : () => void
  }
  export class Signup extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
      super(props);
      this.state = {
        name : "",
        phoneNumber : "",
        email : "",
        password : "",
        confirmPassword : "",
        error : "",
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
    handleSubmit = (event : any) =>{
        event.preventDefault();
        if(this.isFormFilled(this.state.name, this.state.email, this.state.phoneNumber, this.state.password, this.state.confirmPassword) && 
        this.validatePhone(this.state.phoneNumber) && 
        this.validateEmail(this.state.email) && 
        this.validatePassword(this.state.password) && 
        this.confirmPasswordCheck(this.state.password, this.state.confirmPassword))
        {
          const data = {
            Name : this.state.name,
            PhoneNumber : this.state.phoneNumber,
            Email : this.state.email,
            Password : this.state.password,
            ConfirmPassword : this.state.confirmPassword
          }

          postWithoutAuth('https://localhost:44347/api/auth/register', data)
            .then(res => {
            console.log(res);
            if(res.error)
            {
              this.setState({
                error : res.error
              })
            }
            if (res.token) {
              window.localStorage.setItem("authToken", res.token);
              window.localStorage.setItem("user", JSON.stringify(res.user))
              this.props.login();
            }
          }).catch(e => {
            console.log(e);
            return false;
          });
      }
    }
      validateEmail = (email : string) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(email).toLowerCase()))
        {
            this.setState({
                error : "Please enter a valid Email Address "
            })
          return false
        }
        return true;
      }
      validatePhone = (phoneNumber : string) => {
        var re = /^[0]?[789]\d{9}$/;
        if(!re.test(String(phoneNumber).toLowerCase()))
        {
            this.setState({
                error : "Please enter a valid Phone Number "
            })
          return false
        }
        return true;
      }
      validatePassword= (password : string) => {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(!re.test(password))
        {
            this.setState({
                error : "Please enter a valid Password "
            })
          return false
        }
        return true;
      }
      confirmPasswordCheck = (password : string, confirmPassword : string) => {
        if(password !== confirmPassword)
        {
            this.setState({
                error : "Password's don't match "
            })
          return false
        }
        return true;
      }
      isFormFilled = (name : string, email: string , phoneNumber : string, password: string, confirmPassword: string) => {
        if(name ==="" || phoneNumber ==="" || email ==="" || password ==="" || confirmPassword ==="")
        {
            this.setState({
                error : "Please fill all the fields "
            })
          return false;
        }
        return true;
      }
  
    render() {
        const defaultValues = {
            name : "",
            phoneNumber : "",
            email : "",
            password : "",
            confirmPassword : "",
        }
      return localStorage.authToken === undefined || localStorage.authToken === null ? (
        <SignupForm 
        handleSubmit = {this.handleSubmit}
        handleChange = {this.handleChange}
        error = {this.state.error}
        heading = "Sign Up"
        defaultValues = {defaultValues}
        signup = {true}
            />
      ) : ( <Redirect to="/home"/>);
    }
  }
  
  export default Signup