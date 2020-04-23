import React from 'react';
import RideForm from './../RideForm/RideForm'
import ViaPoints from './ViaPoints';
import {  Container } from 'reactstrap';
interface MyProps{
  nextValue : boolean
  values : {}
  handleViaPointChange : (coordinates: any, i: number) => void
  next : () => void
  handleChange : (event: { target: { name: any; value: any; }; } ) => void
  handlePlaceChange : (type : string, place : any) => void
  addViaPoint : () => void
  deleteViaPoint : (index: number) => void
  handleSubmit : (e: { preventDefault: () => void; }) => void
  error1 : string;
  error2 : string;
}
function GeneratePage(props : MyProps) {
    const next = props.nextValue;
    if (!next) {
        return(
        <Container fluid={true} className="offer bg">
          <RideForm
          Heading ={"Offer Ride"}
          values={props.values}
          handleChange={props.handleChange}
          next={props.next}
          handlePlaceChange={props.handlePlaceChange} 
          error={props.error1}
        />
        </Container>
        )
      }
      return (
        <Container fluid={true} className="offer bg">
          <RideForm
          Heading ={"Offer Ride"}
          values={props.values}
          handleChange={props.handleChange}
          next={props.next}
          handlePlaceChange={props.handlePlaceChange} 
          error={props.error1}
          />
          <ViaPoints
          values ={props.values}
          handleChange = {props.handleChange}
          handleViaPointChange = {props.handleViaPointChange}
          addViaPoint = {props.addViaPoint}
          deleteViaPoint = {props.deleteViaPoint}
          handleSubmit = {props.handleSubmit}
          error={props.error2}
          />
        </Container>
      )

}

export default GeneratePage;