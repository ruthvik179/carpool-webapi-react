import React, { useState } from 'react';
import { DropdownToggle, ButtonDropdown, DropdownMenu, DropdownItem, Col } from 'reactstrap';
import history from './../../history'
interface MyProps {
    logout : () => void
}
function Profile(props : MyProps) {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const user = JSON.parse(localStorage.user);
    const redirect = (loc : string) => {
        history.push(loc)
    }
        
    return (
        <Col xs="4" className="profile-container">
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
                <p>{user.name}</p>
                <img className="profile-image" src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-1024x941.png" alt="Profile"/>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick = {() =>redirect('/profile')}>
                    <p>Profile</p>
                </DropdownItem>
                <DropdownItem onClick = {() =>redirect('/rides')}>Rides</DropdownItem>
                <DropdownItem onClick = {() =>props.logout()}> Logout</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </Col>
    );
}


export default Profile;