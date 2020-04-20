import React from "react";
export interface rides extends Array<any> { }
interface MyProps{
bookings : rides
handleCancel : (id : string) => void
}
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
        const id = val.id;
        return(
          <tr>
            <td>{i+1}</td>
            <td>{val.name}</td>
            <td>{val.source}</td>
            <td>{val.destination}</td>
            <td>₹{val.price}</td>
            <td>
              <button className="cancel-button" onClick={() => {props.handleCancel(id)}}>Cancel</button>
            </td>
          </tr>
        )})}
        </tbody>    
    </table>
                
  );
}



