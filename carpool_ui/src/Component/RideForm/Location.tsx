import React from "react";
import Autocomplete from "react-google-autocomplete";

export default function Location(props: { value: any; handlePlaceChange: (arg0: any, arg1: { formatted_address: any; geometry: { location: { lat: () => number; lng: () => number; }; }; }) => void; for: any; }) {
  return (
    <React.Fragment>
      <Autocomplete
        className="form-control form-control-sm"
        value={props.value}
        onPlaceSelected={(place: { formatted_address: any; geometry: { location: { lat: () => number; lng: () => number; }; }; }) => {
            console.log(place)
            props.handlePlaceChange(props.for, place);
        }}
        types={["(cities)"]}
        componentRestrictions={{ country: "in" }}
        onChange={(e: { target: { value: any; }; }) => {
                    
            const place = {
              formatted_address: e.target.value,
              geometry : {
                location : {
                  lat : function() {return 0},
                  lng : function() {return 0}
                }
              }
            };
            props.handlePlaceChange(props.for, place);
          }}

      />
    </React.Fragment>
  );
}