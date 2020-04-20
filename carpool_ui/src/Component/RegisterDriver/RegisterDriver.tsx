import React, { Component } from 'react'
import RegisterDriverForm from './RegisterDriverForm'
import history from './../../history'
interface MyState{
    license : string,
    registrationNumber : string,
    carManufacturer : string,
    carModel : string,
    carYearOfManufacture : string,
    error : string
}
interface MyProps {

}
export class RegisterDriver extends Component<MyProps, MyState> {
    constructor(props : MyProps) {
        super(props);
        this.state = {
            license : "",
            registrationNumber : "",
            carManufacturer : "",
            carModel : "",
            carYearOfManufacture : "",
            error : ""
        }
    }
    handleChange = (event: { target: { name: any; value: any;}; }): void => {
        const key = event.target.name;
        const value = event.target.value;
        if (Object.keys(this.state).includes(key)) {
          this.setState({[key]: value } as Pick<MyState, keyof MyState>);
        }
    }
    handleSubmit = (e: { preventDefault: () => void; }) => {
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
    
        fetch(`https://localhost:44347/api/driver/RegisterDriver/`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken,
          },
          body: JSON.stringify(data),
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
          .then(()=>{history.push('/offer')});
      }
    };
    validateRegistrationNumber = (registrationNumber : string) => {
      var re = /^[A-Z]{2}[0-9]{1,2}[A-Z]{2}[0-9]{4}$/;
      if(!re.test(registrationNumber))
      {
        this.setState({
          error :"Please enter a valid Vehicle Registration Number"
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
          error :"Please enter a valid License Number"
        })
        return false
      }
      return true;
    }
    isFormFilled = (licenseNo: string, registrationNumber: string, carManufacturer: string, carModel : string, carYearOfManufacture : string) => {
     if(licenseNo.trim()==="" || registrationNumber.trim()==="" || carManufacturer.trim()===""|| carModel.trim()===""|| carYearOfManufacture.trim()===""){
      this.setState({
        error :"Please fill all the fields"
      })
      return false
      }
      return true
    }
    render() {
      const defaultValues ={
        license : "",
        registrationNumber : "",
        carManufacturer : "",
        carModel : "",
        carYearOfManufacture : "",
        error : ""
      }
        return (
            <div className="register-driver">
                <h1 className="main-heading" >Please register as a <span className="driver-text">Driver</span> to be able to <span className="offer-text">Offer</span> Rides</h1>
                <RegisterDriverForm defaultValues={defaultValues} heading="Driver Registration" error={this.state.error}handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default RegisterDriver
