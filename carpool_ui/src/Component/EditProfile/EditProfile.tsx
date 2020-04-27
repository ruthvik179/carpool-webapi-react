import React, { Component } from 'react'
import SignupForm from './../Signup/SignupForm'
import { Col, Alert } from 'reactstrap';
import RegisterDriverForm from '../RegisterDriver/RegisterDriverForm';
import { CSSTransition } from 'react-transition-group';
import { put, get } from '../../Services/api';
import { updateDetails } from '../../Interfaces/updateDetails';
import { driver } from '../../Interfaces/driver';

interface MyState{
    name : string;
    phoneNumber : string;
    email : string;
    license : string,
    registrationNumber : string,
    carManufacturer : string,
    carModel : string,
    carYearOfManufacture : string,
    errorDetails : string;
    errorDriver : string;
    defaultDetailsValues : updateDetails;
    defaultDriverValues : driver;
    isADriver : boolean;
    success : boolean;
    alert : string;
}
export class EditProfile extends Component <{},MyState>{
    constructor(props) {
        super(props);
        this.state = {
          name : "",
          phoneNumber : "",
          email : "",
          license : "",
          registrationNumber : "",
          carManufacturer : "",
          carModel : "",
          carYearOfManufacture : "",
          errorDetails : "",
          errorDriver : "",
          defaultDetailsValues: { 
            name : "",
            phoneNumber : "",
            email : ""
         },
         defaultDriverValues : {
            license : "",
            registrationNumber : "",
            carManufacturer : "",
            carModel : "",
            carYearOfManufacture : "",
         },
         isADriver : true,
         success : false,
         alert : ""
        }
    }
    componentDidMount(){
        get('https://localhost:44347/api/user/getdetails')
              .then(res => {
              console.log(res);
              this.setState({
                name : res.name,
                phoneNumber : res.phoneNumber,
                email : res.email,
                license : res.license,
                registrationNumber : res.registrationNumber,
                carManufacturer : res.carManufacturer,
                carModel : res.carModel,
                carYearOfManufacture : res.carYearOfManufacture,
                  defaultDetailsValues : {
                      name: res.name,
                      phoneNumber : res.phoneNumber,
                      email : res.email
                  },
                  defaultDriverValues : {
                    license : res.license,
                    registrationNumber : res.registrationNumber,
                    carManufacturer : res.carManufacturer,
                    carModel : res.carModel,
                    carYearOfManufacture : res.carYearOfManufacture,
                  }
              })
            }).catch(e => {
              console.log(e);
        });
    }
    handleChange = (event: { target: { name: any;  value: any}; }): void => {
        const key = event.target.name;
        const value = event.target.value;
        console.log(value);
        if (Object.keys(this.state).includes(key)) {
          this.setState({[key]: value } as Pick<MyState, keyof MyState>);
        }
      }
      handleDetailsSubmit = (event : any) =>{
          event.preventDefault();
          if(this.isDetailsFormFilled(this.state.name, this.state.email, this.state.phoneNumber) && 
          this.validatePhone(this.state.phoneNumber) && 
          this.validateEmail(this.state.email))
          {
            const data = {
              Name : this.state.name,
              PhoneNumber : this.state.phoneNumber,
              Email : this.state.email
            }
  
            put('https://localhost:44347/api/user/update', data)
              .then(res => {
              console.log(res);
              if (res.token) {
                window.localStorage.setItem("authToken", res.token);
                window.localStorage.setItem("user", JSON.stringify(res.user))
              }
              this.setState({
                  success : true,
                  alert : "Personal Details Updated"
              })
              setTimeout(() => {
                this.setState({
                    success: false
                })
             }, 2000);
            }).catch(e => {
              console.log(e);
            });
        }
      }
     validateEmail = (email : string) => {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!re.test(String(email).toLowerCase()))
          {
              this.setState({
                  errorDetails : "Please enter a valid Email Address "
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
                errorDetails : "Please enter a valid Phone Number "
            })
        return false
        }
        return true;
    }
    isDetailsFormFilled = (name : string, email: string , phoneNumber : string) => {
        if(name ==="" || phoneNumber ==="" || email ==="" )
        {
            this.setState({
                errorDetails : "Please fill all the fields "
            })
        return false;
        }
        return true;
    }
    handleDriverSubmit = (e: { preventDefault: () => void; }) => {
        if(this.isFormFilled(this.state.license, this.state.registrationNumber, this.state.carManufacturer, this.state.carModel, this.state.carYearOfManufacture) &&
        this.validateLicense(this.state.license) && this.validateRegistrationNumber(this.state.registrationNumber)){
            e.preventDefault();
            const data = {
            LicenseNo: this.state.license,
            RegistrationNo: this.state.registrationNumber,
            CarManufacturer: this.state.carManufacturer,
            CarModel: this.state.carModel,
            YearOfManufacture : this.state.carYearOfManufacture,
            };
        
            put(`https://localhost:44347/api/driver/update/`, data)
            .then(res => console.log(res))
            .then(() => {
                this.setState({
                    success : true,
                    alert : "Driver Details Updated"
                })
                setTimeout(() => {
                  this.setState({
                      success: false
                  })
               }, 2000);
            })
            .catch(err => console.log(err));
        }
        };
    validateRegistrationNumber = (registrationNumber : string) => {
        var re = /^[A-Z]{2}[0-9]{1,2}[A-Z]{2}[0-9]{4}$/;
        if(!re.test(registrationNumber))
        {
            this.setState({
            errorDriver :"Please enter a valid Vehicle Registration Number"
            })
            return false
        }
        return true;
    }  
    validateLicense = (license: string) => {
        if(!((/^([A-Z]{2})([0-9]{2})/).test(license)
        && (/\w+((20[0-1][0-9])|(2020))[0-9]{7}/).test(license) 
        && license.length === 15)){
            this.setState({
            errorDriver :"Please enter a valid License Number"
            })
            return false
        }
        return true;
    }
    isFormFilled = (licenseNo: string, registrationNumber: string, carManufacturer: string, carModel : string, carYearOfManufacture : string) => {
        if(licenseNo.trim()==="" || registrationNumber.trim()==="" || carManufacturer.trim()===""|| carModel.trim()===""|| carYearOfManufacture.trim()===""){
        this.setState({
            errorDriver :"Please fill all the fields"
        })
        return false
        }
        return true
    }
    render() {
        return (
            <React.Fragment>
                <CSSTransition
                in={this.state.success}
                timeout={350}
                classNames="display"
                unmountOnExit
                >
                    <Alert id="alert" color="success">{this.state.alert}</Alert> 
                </CSSTransition>
                <Col xs="12" className="edit-profile bg">
                    <SignupForm 
                    heading ="Personal Details" 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleDetailsSubmit} 
                    error={this.state.errorDetails} 
                    defaultValues={this.state.defaultDetailsValues} 
                    signup={false}
                    />
                    <RegisterDriverForm 
                    defaultValues={this.state.defaultDriverValues} 
                    heading="Driver Details" 
                    error={this.state.errorDriver}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleDriverSubmit}
                    />    
                </Col>
            </React.Fragment>
        )
    }
}

export default EditProfile
