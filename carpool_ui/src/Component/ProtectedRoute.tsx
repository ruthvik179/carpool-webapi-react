import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

interface MyProps{
    component : any;
    exact : any;
    path : any;
}

export default function ProtectedRoute({ component: Component, ...rest } : MyProps) {
  const isAuthenticated = useSelector((state : any) => state.authenticate.isAuthenticated)
  // console.log(rest);
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {         
          return <Component {...rest}/>
        } else {
           props.history.push('/login');
        }
      }}
    />
  );
}