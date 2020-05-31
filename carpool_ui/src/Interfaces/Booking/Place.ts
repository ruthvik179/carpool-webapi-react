export interface Place {
    name: string;
    lat: number;
    lng: number;
    id : string;
}
export interface ViaPoints extends Array<Place> { }