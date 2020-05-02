import React from "react";
import { HelperService } from "../../Services/HelperService";
export interface rides extends Array<any> { }
interface MyProps{
bookings : rides
handleCancel : (id : string) => void
}
var helperService = new HelperService();
export default function Bookings(props : MyProps) {
  return (
    <table className="table">
      <thead hidden>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>From</th>
          <th>To</th>
          <th>Price</th>
          <th>Decline</th>
        </tr>
      </thead>
      <tbody>
      {props.bookings.map((val: any, i: number) => {
        var source = val.source.slice(0,val.source.indexOf(","));
        var destination = val.destination.slice(0,val.destination.indexOf(","));
        const id = val.id;
        return(
          <tr>
            <td>{i+1}</td>
            <td>{val.name}</td>
            <td>{source}</td>
            <td>{destination}</td>
            <td>₹{helperService.formatCurrency(val.price)}</td>
            <td>
              <button className="cancel-button" onClick={() => {props.handleCancel(id)}}>Cancel</button>
            </td>
          </tr>
        )})}
        </tbody>    
    </table>
                
  );
}



