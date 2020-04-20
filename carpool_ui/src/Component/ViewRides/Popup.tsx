import React from 'react'
import { Card, Container, Row, Col } from 'reactstrap';
import Bookings from './Bookings';
import Requests from './Requests';
import history from './../../history'
export interface rides extends Array<any> { }
interface MyProps{
  text : string;
  closePopup : () => void;
  bookings : rides;
  requests : rides;
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
      fetch(`https://localhost:44347/api/driver/confirmbooking`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(
          (res) => {
            console.log(res);
          }
        )
        .catch(err => console.log(err));
        history.push('/rides');
    }
    handleCancel = (id : string) =>{
      console.log(id);
      fetch(`https://localhost:44347/api/driver/cancelbooking`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify(id)
      })
        .then(res => res.json())
        .then(
          (res) => {
            console.log(res);
          }
        )
        .catch(err => console.log(err));
        history.push('/rides');
    }
    render() {
      return (
        <Container fluid={true} className="popup">
          <Card className="popup-inner">
            <Row>
              <Col xs="11">
                <h3>Ride Details</h3>
              </Col>
              <Col xs="1">
                <button className="close" onClick={this.props.closePopup}><b>X</b></button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">From </p>
                <p>Hyderabad</p>
              </Col>
              <Col>
                <p className="label">To </p>
                <p>Warangal</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">Seats Available </p>
                <p>6</p>
              </Col>
              <Col>
                <p className="label">Date Of Journey </p>
                <p>16-04-20</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="label">Bookings </p>
                <p>3</p>
              </Col>
              <Col>
                <p className="label">Requests </p>
                <p>3</p>
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