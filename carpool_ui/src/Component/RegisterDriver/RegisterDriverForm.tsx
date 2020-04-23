import React from 'react';
import { Card } from 'reactstrap';
interface MyProps{
    handleChange : (event: { target: { name: any; value: any;};} ) => void
    handleSubmit : (e: { preventDefault: () => void; }) => void
    error : string
    heading : string
    defaultValues : values
}
interface values{
    license : string
    registrationNumber : string
    carManufacturer : string
    carModel : string
    carYearOfManufacture : string
}
function RegisterDriverForm(props : MyProps) {
    
    return (
        <Card>
            <div className="heading">
                <h1>{props.heading}</h1>
            </div>
                {props.error ? <p className="error">{props.error}</p> : null}
            <div className="license">
                <label htmlFor="License">License Number</label>
                <input type="text" id="license" name="license" placeholder="Enter your License" defaultValue={props.defaultValues.license} onChange = {(e)=>props.handleChange(e)}/>
            </div>
            <div className="registration-number">
                <label htmlFor="Registration Number">Car Registration Number</label>
                <input type="text" id="registrationNumber" name="registrationNumber" placeholder="Enter your Car Registration Number" defaultValue={props.defaultValues.registrationNumber} onChange = {(e)=>props.handleChange(e)}/>
            </div>
            <div className="manufacturer">
                <label htmlFor="Manufacturer">Car Manufacturer</label>
                <input type="text" id="manufacturer" name="carManufacturer" placeholder="Enter your Car Manufacturer" defaultValue={props.defaultValues.carManufacturer} onChange = {(e)=>props.handleChange(e)}/>
            </div>
            <div className="model">
                <label htmlFor="Model">Car Model</label>
                <input type="text" id="model" name="carModel" placeholder="Enter your Car Model" defaultValue={props.defaultValues.carModel} onChange = {(e)=>props.handleChange(e)}/>
            </div>
            <div className="year-of-manufacture">
                <label htmlFor="Year Of Manufacture">Year Of Manufacture</label>
                <input type="text" id="yearOfManufacture" name="carYearOfManufacture" placeholder="Enter your Car's Year Of Manufacture" defaultValue={props.defaultValues.carYearOfManufacture} onChange = {(e)=>props.handleChange(e)}/>
            </div>
            <div className="submit-container">
                    <button className="submit" type="button" name="submit" onClick={props.handleSubmit}>Submit</button>
            </div>
        </Card>
    );
}

export default RegisterDriverForm;