import React from "react";
export interface rides extends Array<any> { }
interface MyProps{
  requests : rides
  handleConfirm: (id : string, flag : boolean) => void
  }
export default function Requests(props : MyProps) {
  return (
      <table className="table">
        <thead hidden>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>
              <span>Accept</span>

              <span>Decline</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {props.requests.map((val: any, i: number) => {
          const id = val.id;
        return(
          <tr>
            <td>{i+1}</td>
            <td>{val.name}</td>
            <td>{val.source}</td>
            <td>{val.destination}</td>
            <td>₹{val.price}</td>
            <td>
              <button className="accept-button" onClick={() => {props.handleConfirm(id, true)}}>Accept</button>
              <button className="reject-button" onClick={() => {props.handleConfirm(id, false)}}>Reject</button>
            </td>
          </tr>
        )})}
        </tbody>    
      </table>
  );
}