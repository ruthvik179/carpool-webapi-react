import React from 'react'
import { Card, Container, Row, Col } from 'reactstrap';
import Bookings from './Bookings';
import Requests from './Requests';
import history from './../../history'
import {post, get} from './../../Services/api'
import { rideDetails } from '../../Interfaces/rideDetails';
import { bookings_requests } from '../../Interfaces/bookings_requests';

interface MyProps{
  text : string;
  closePopup : () => void;
  bookings : bookings_requests;
  requests : bookings_requests;
  ride : rideDetails;
  cancelRide : (id : string) => void;
}
interface MyState{
    showTab : number;
}
class Popup extends React.Component<MyProps, MyState>{
    constructor(props) {
        super(props);
    
        this.state = { 
          showTab: 1,
        };
      }
    handleConfirm= (id : string, flag : boolean) =>{
      const data = {
        Accepted : flag,
        Id : id
      }
      this.props.closePopup();
      post(`https://localhost:44347/api/driver/confirmbooking`, data)
        .then(res =>console.log(res))
        .catch(err => console.log(err));
    }
    handleCancel = (id : string) =>{
      console.log(id);
      this.props.closePopup();
      post(`https://localhost:44347/api/driver/cancelbooking`, id)
        .then(res =>console.log(res))
        .catch(err => console.log(err));
    }
    render() {
      const id = this.props.ride.id;
      return (
        <Container fluid={true} className="popup">
          <Card className="popup-inner">
            <Row>
              <Col xs="12">
                <button className="close" onClick={this.props.closePopup}><b>X</b></button>
              </Col>
            </Row>
            <Row>
              <Col xs="8">
                <h3>Ride Details</h3>
              </Col>
              <Col xs="4">
                <button className="cancel-ride" onClick={()=> {this.props.cancelRide(id)}}>Cancel</button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">From </p>
                <p>{this.props.ride.source}</p>
              </Col>
              <Col>
                <p className="label">To </p>
                <p>{this.props.ride.destination}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">Seats Available </p>
                <p>{this.props.ride.seatCount}</p>
              </Col>
              <Col>
                <p className="label">Date Of Journey </p>
                <p>{this.props.ride.date.slice(0,10)}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">Bookings </p>
                <p>{this.props.ride.bookingCount}</p>
              </Col>
              <Col>
                <p className="label">Requests </p>
                <p>{this.props.ride.requestCount}</p>
              </Col>
            </Row>
            <Row className="tabs">
              <Col xs="4"
                className={`${this.state.showTab === 1 ? "active" : ""}`}
                onClick={() => this.setState({ showTab: 1 })}
              >
                <h3>Bookings</h3>
              </Col>

              <Col xs="4"
                className={`${this.state.showTab === 2 ? "active" : ""}`}
                onClick={() => this.setState({ showTab: 2 })}
              >
                <h3>Requests</h3>
              </Col>
            </Row>
            {this.state.showTab === 1 ? <Bookings handleCancel={this.handleCancel} bookings={this.props.bookings}/> : <Requests handleConfirm={this.handleConfirm} requests={this.props.requests}/>}
          </Card>
        </Container>
      );
    }
  }
  export default Popup