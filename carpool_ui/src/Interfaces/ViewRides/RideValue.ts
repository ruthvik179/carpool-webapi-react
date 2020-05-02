export interface RideValue{
    name : string;
    source : string;
    destination: string;
    date : string;
    time : string;
    price ?: number;
    distance ?: number;
    seatCount : number;
    id : string;
    status ?: string;
    cancellationCharges? : number;
    sgst? : number;
    cgst? : number;
  }


