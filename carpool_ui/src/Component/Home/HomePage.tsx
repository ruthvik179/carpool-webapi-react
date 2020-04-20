import React from 'react';
import {Row, Col} from 'reactstrap';
import './../../Styles/style.scss';
import history from './../../history'
function Home(props : any) {
    const user = JSON.parse(localStorage.user);
    const redirect = (loc : string) => {
        history.push(loc)
    }
    return (
        <Col className = "home-container"xs ="12">
              <Row className="header-row" p="3">
                <Col className="header-column" xs="6">
                    <h3 className="welcome-text">Heyy {user.name}</h3>
                </Col>
            </Row>
            <Row className="home-menu">
                <Col className="menu-book" xs ="6">
                    <button 
                        type ="button" 
                        className="btn btn-primary button-book" 
                        onClick = {() =>redirect('/book')}>
                            Book A Ride
                    </button>
                </Col>
                <Col className="menu-offer" xs ="6">
                    <button 
                        type ="button" 
                        className="btn btn-primary button-offer" 
                        onClick = {
                            () =>{
                                fetch(`https://localhost:44347/api/driver/isadriver`, {
                                    method: "GET",
                                    headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.authToken,
                                    }
                                })
                                    .then(res => res.json())
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
                        Offer A Ride
                    </button>
                </Col>
            </Row>
        </Col>
    );
}
export default Home;

