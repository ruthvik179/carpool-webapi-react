import React, { Component } from 'react';
import logo from './images/logo.png';
import { Col } from 'reactstrap';
import './/Styles/style.scss'
import history from './history'
export class Layout extends Component {
static displayName = Layout.name;
handleClick = () => {
  history.push("/home");
}
  render () {
    return (
      <Col className="layout"xs="8">
          <Col className="logo" xs="2" onClick = {this.handleClick}>
              <img src={logo} alt="Logo"></img>
          </Col>
          {this.props.children}
      </Col>
    
    );
  }
}
