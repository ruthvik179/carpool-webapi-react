import ReactLoading from "react-loading";
import React from "react";
import { Col } from "reactstrap";
 function Loading(props) {
     return (
         <Col xs="12" className="loader">
             <ReactLoading type={"bars"} color={"#9319ff"} width={'8%'} className="loading-animation"/>
         </Col>
     );
 }
 export default Loading;