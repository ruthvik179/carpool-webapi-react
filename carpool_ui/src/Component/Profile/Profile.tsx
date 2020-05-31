import React, { Component } from 'react';
import { DropdownToggle, ButtonDropdown, DropdownMenu, DropdownItem, Col } from 'reactstrap';
import { logout } from '../../Redux/Services/AuthenticationServices';
import history from './../../history'
import { connect } from 'react-redux';
interface MyProps {
    user : {
        name : string
    };
}
interface MyState {
    dropdownOpen : boolean;
}
export class Profile extends Component <MyProps, MyState>{
    constructor(props : MyProps) {
        super(props);
        this.state = {
            dropdownOpen : false
        }
    }
    toggle = () => this.setState({dropdownOpen : !this.state.dropdownOpen});
    redirect = (loc : string) => {history.push(loc)}
    logout= () =>{}
    render() {
    return (
        <Col xs="4" className="profile-container">
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle>
                <p>{this.props.user.name}</p>
                <img className="profile-image" src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-1024x941.png" alt="Profile"/>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick = {() =>this.redirect('/profile')}>
                    <p>Profile</p>
                </DropdownItem>
                <DropdownItem onClick = {() =>this.redirect('/rides')}>Rides</DropdownItem>
                <DropdownItem onClick = {() => logout()}> Logout</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </Col>
    );
    }
}
const mapStateToProps = state =>{
    return{
        user : state.profile.user
    }
  }
  
  const mapDispatchToProps = dispatch =>{
     return{
         logout: ()=> dispatch(logout())
     };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Profile);