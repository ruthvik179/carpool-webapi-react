import { Price } from "../Booking/Price";

export interface RideValue{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price ?: Price;
    distance ?: number;
    seatCount : number;
    id : string;
    status ?: string;
    cancellationCharges? : number;
  }


