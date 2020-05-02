import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { Driver } from '../Interfaces/Driver';
import { DriverDetailsConstants } from '../Constants/DriverDetailsConstants';
var driverDetailsConstants = new DriverDetailsConstants();
interface MyProps{
    handleChange : (event: { target: { name: any; value: any;};} ) => void
    handleSubmit : (e: { preventDefault: () => void; }) => void
    error : string
    heading : string
    defaultValues : Driver
}

export class DriverDetailsForm extends Component<MyProps> {
    render() {
        return (
            <Card>
                <div className="heading">
                    <h1>{this.props.heading}</h1>
                </div>
                    {this.props.error ? <p className="error">{this.props.error}</p> : null}
                <div className="license">
                    <label htmlFor="License">{driverDetailsConstants.LicenseLabel}</label>
                    <input type="text" id="license" name="license" placeholder={driverDetailsConstants.LicensePlaceHolder} defaultValue={this.props.defaultValues.license} onChange = {(e)=>this.props.handleChange(e)}/>
                </div>
                <div className="registration-number">
                    <label htmlFor="Registration Number">{driverDetailsConstants.RegistrationNumberLabel}</label>
                    <input type="text" id="registrationNumber" name="registrationNumber" placeholder={driverDetailsConstants.RegistrationNumberPlaceHolder} defaultValue={this.props.defaultValues.registrationNumber} onChange = {(e)=>this.props.handleChange(e)}/>
                </div>
                <div className="manufacturer">
                    <label htmlFor="Manufacturer">{driverDetailsConstants.CarManufacturerLabel}</label>
                    <input type="text" id="manufacturer" name="carManufacturer" placeholder={driverDetailsConstants.CarManufacturerPlaceHolder} defaultValue={this.props.defaultValues.carManufacturer} onChange = {(e)=>this.props.handleChange(e)}/>
                </div>
                <div className="model">
                    <label htmlFor="Model">{driverDetailsConstants.CarModelLabel}</label>
                    <input type="text" id="model" name="carModel" placeholder={driverDetailsConstants.CarModelPlaceHolder} defaultValue={this.props.defaultValues.carModel} onChange = {(e)=>this.props.handleChange(e)}/>
                </div>
                <div className="year-of-manufacture">
                    <label htmlFor="Year Of Manufacture">{driverDetailsConstants.CarYearLabel}</label>
                    <input type="text" id="yearOfManufacture" name="carYearOfManufacture" placeholder={driverDetailsConstants.CarYearPlaceHolder} defaultValue={this.props.defaultValues.carYearOfManufacture} onChange = {(e)=>this.props.handleChange(e)}/>
                </div>
                <div className="submit-container">
                        <button className="submit" type="button" name="submit" onClick={this.props.handleSubmit}>Submit</button>
                </div>
            </Card>
        );
    }
}

export default DriverDetailsForm;