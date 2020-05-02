import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import './../../Styles/style.scss';
import history from './../../history'
import { ApiConnection } from '../../Services/ApiConnection'
import { HomePageConstants } from '../../Constants/HomePageConstants';
import { Urls } from '../../Constants/Urls';
var api = new ApiConnection();
var homePageConstants = new HomePageConstants();
var urls = new Urls();
export class Home extends Component <{}>{ 
    user = JSON.parse(localStorage.user);
    redirect = (loc : string) => {
        history.push(loc)
    }
    render() {
        return (
            <Col className = "home-container"xs ="12">
                <Row className="header-row" p="3">
                    <Col className="header-column" xs="6">
                        <h3 className="welcome-text">{homePageConstants.Greeting} {this.user.name}</h3>
                    </Col>
                </Row>
                <Row className="home-menu">
                    <Col className="menu-book" xs ="6">
                        <button 
                            type ="button" 
                            className="btn btn-primary button-book" 
                            onClick = {() =>this.redirect('/book')}>
                                {homePageConstants.BookRideLabel}
                        </button>
                    </Col>
                    <Col className="menu-offer" xs ="6">
                        <button 
                            type ="button" 
                            className="btn btn-primary button-offer" 
                            onClick = {
                                () =>{
                                    api.get(urls.IsADriver)
                                        .then(
                                        (res ) => {
                                            console.log(res);
                                            if(res.isADriver)
                                            {
                                                history.push('/offer')
                                            }
                                            else{
                                                history.push('/registerdriver')
                                            }
                                            // redirect('/offer')
                                        }
                                        )
                                        .catch(err => console.log(err));
                                }
                            }>
                            {homePageConstants.OfferRideLabel}
                        </button>
                    </Col>
                </Row>
            </Col>
        );
    }
}
export default Home;

