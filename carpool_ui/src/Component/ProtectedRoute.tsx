import React from "react";
import { Route } from "react-router-dom";

interface MyProps{
    component : any;
    auth : any;
    exact : any;
    path : any;
    isADriver? : boolean;
    driverCheck? : (flag : boolean) => void
}
export default function ProtectedRoute({ component: Component, auth : Auth, ...rest } : MyProps) {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth) {         
          return <Component {...rest}/>
        } else {
           props.history.push('/login');
        }
      }}
    />
  );
}