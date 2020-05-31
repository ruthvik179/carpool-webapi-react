import { Price } from "./Price";
export interface RideMatch{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price : Price;
    distance : number;
    seatCount : number;
    id : string;
  }


  