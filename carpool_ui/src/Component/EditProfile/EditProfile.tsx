import React, { Component } from 'react'
import UserDetailsForm from '../UserDetailsForm'
import { Col, Alert } from 'reactstrap';
import DriverDetailsForm from '../DriverDetailsForm';
import { CSSTransition } from 'react-transition-group';
import { Driver } from '../../Interfaces/Driver';
import { UserDetailsConstants } from '../../Constants/UserDetailsConstants';
import { DriverDetailsConstants } from '../../Constants/DriverDetailsConstants';
import Promotions from '../Promotions/Promotions';
import { Promotion } from '../../Interfaces/Promotion/Promotion';
import { AppState } from '../../Redux/rootreducer';
import { connect } from 'react-redux';
import { User } from '../../Interfaces/Login/User';
import { UpdateDriver, UpdatePromotionDetails, UpdateUser } from '../../Redux/Services/ProfileServices';
var userDetailsConstants = new UserDetailsConstants();
var driverDetailsConstants = new DriverDetailsConstants();
interface MyProps{
    updateUser : (name : string, email: string, phoneNumber : string) => void;
    updateDriver : (license : string, registrationNumber : string, carManufacturer : string, carModel : string,carYearOfManufacture : string) => void;
    updatePromo : (distance : string, discount : string) => void;
    defaultUserDetails : User;
    defaultDriverDetails : Driver;
    defaultPromoDetails : Promotion;
    alert : string;
    alertType : string;
}
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
    errorPromotions : string;
    distance : string;
    discount : string;
}
export class EditProfile extends Component <MyProps,MyState>{
    constructor(props) {
        super(props);
        this.state = {
          name : this.props.defaultUserDetails.name,
          phoneNumber : this.props.defaultUserDetails.phoneNumber,
          email : this.props.defaultUserDetails.email,
          license : this.props.defaultDriverDetails.license,
          registrationNumber : this.props.defaultDriverDetails.registrationNumber,
          carManufacturer : this.props.defaultDriverDetails.carManufacturer,
          carModel : this.props.defaultDriverDetails.carModel,
          carYearOfManufacture : this.props.defaultDriverDetails.carYearOfManufacture,
          errorDetails : "",
          errorDriver : "",
          errorPromotions : "",
          distance : this.props.defaultPromoDetails.distance,
          discount : this.props.defaultPromoDetails.discount,
        }
    }

    handleChange = (event: { target: { name: any;  value: any}; }): void => {
        const key = event.target.name;
        const value = event.target.value;
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
            this.props.updateUser(this.state.name, this.state.email, this.state.phoneNumber);
        }
    }
    validateEmail = (email : string) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(email).toLowerCase()))
        {
            this.setState({
                errorDetails : userDetailsConstants.EmailError
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
                errorDetails : userDetailsConstants.PhoneError
            })
        return false
        }
        return true;
    }
    isDetailsFormFilled = (name : string, email: string , phoneNumber : string) => {
        if(name ==="" || phoneNumber ==="" || email ==="" )
        {
            this.setState({
                errorDetails : userDetailsConstants.FormNotFilledError
            })
        return false;
        }
        return true;
    }
    handleDriverSubmit = (e: { preventDefault: () => void; }) => {
        if(this.isDriverFormFilled(this.state.license, this.state.registrationNumber, this.state.carManufacturer, this.state.carModel, this.state.carYearOfManufacture) &&
        this.validateLicense(this.state.license) && this.validateRegistrationNumber(this.state.registrationNumber)){
            e.preventDefault();
            this.props.updateDriver(this.state.license, this.state.registrationNumber, this.state.carManufacturer, this.state.carModel, this.state.carYearOfManufacture);
        }
    }
    validateRegistrationNumber = (registrationNumber : string) => {
        var re = /^[A-Z]{2}[0-9]{1,2}[A-Z]{2}[0-9]{4}$/;
        if(!re.test(registrationNumber))
        {
            this.setState({
            errorDriver : driverDetailsConstants.RegistrationError
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
            errorDriver : driverDetailsConstants.LicenseError
            })
            return false
        }
        return true;
    }
    isDriverFormFilled = (licenseNo: string, registrationNumber: string, carManufacturer: string, carModel : string, carYearOfManufacture : string) => {
        console.log(licenseNo);
        if(licenseNo.trim()==="" || registrationNumber.trim()==="" || carManufacturer.trim()===""|| carModel.trim()===""|| carYearOfManufacture.trim()===""){
        this.setState({
            errorDriver : driverDetailsConstants.FormNotFilledError
        })
        return false
        }
        return true
    }
    handlePromotionsSubmit = () => {
        if(this.state.discount === "" || this.state.distance === ""){
            this.setState({
                errorPromotions : driverDetailsConstants.FormNotFilledError
            })
        }
        else{
            this.props.updatePromo(this.state.distance , this.state.discount)
        }
    }
    render() {
        return (
            <React.Fragment>
                <CSSTransition
                in={this.props.alert !== ""? true : false}
                timeout={350}
                classNames="display"
                unmountOnExit
                >
                    <Alert id="alert" color={this.props.alertType}>{this.props.alert}</Alert> 
                </CSSTransition>
                <Col xs="12" className="edit-profile bg">
                    <UserDetailsForm 
                    heading ="Personal Details" 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleDetailsSubmit} 
                    error={this.state.errorDetails} 
                    defaultValues={this.props.defaultUserDetails} 
                    signup={false}
                    />
                    <DriverDetailsForm 
                    defaultValues={this.props.defaultDriverDetails} 
                    heading="Driver Details" 
                    error={this.state.errorDriver}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleDriverSubmit}
                    />    
                    <Promotions
                    handleChange={this.handleChange} 
                    handleSubmit={this.handlePromotionsSubmit} 
                    error={this.state.errorPromotions} 
                    defaultValues= {this.props.defaultPromoDetails}
                    />
                </Col>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state : AppState) =>{
    return{
        defaultUserDetails : state.profile.user,
        defaultDriverDetails : state.profile.DriverDetails,
        defaultPromoDetails : state.profile.PromotionDetails,
        alert :state.profile.alert,
        alertType : state.profile.alertType
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        updateUser : (name : string, email: string, phoneNumber : string) => dispatch(UpdateUser(name, email, phoneNumber)),
        updateDriver : (license : string, registrationNumber : string, carManufacturer : string, carModel : string,carYearOfManufacture : string
        ) => dispatch(UpdateDriver(license, registrationNumber, carManufacturer, carModel, carYearOfManufacture)),
        updatePromo : (distance : string, discount : string) => dispatch(UpdatePromotionDetails(distance, discount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
