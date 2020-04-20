import React, { Component } from 'react'
import './../Styles/style.scss'
import { Col } from 'reactstrap';

export class Imagelogin extends Component {
    render() {
        return (
            <Col xs="12"className="header">
                <h1 className= "heading1">TURN <span className= "sub-heading1">MILES</span></h1>
                <h1 className= "heading2">INTO <span className= "sub-heading2">MONEY</span></h1>
            </Col>
        )
    }
}

export default Imagelogin
