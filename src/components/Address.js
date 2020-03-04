import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";


class Address extends React.Component {
  constructor() {
    super();
    this.state = { address: "" };
  }
  render() {
      // console.log(this.state.address)
    return (
      <div>
        <GooglePlacesAutocomplete 
        onSelect={console.log}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['us'],
          }
        }}
        // onSelect={(selectedResult) => this.setState({ address: selectedResult.description })}
        />
      </div>
    );
  }
}
export default Address;
