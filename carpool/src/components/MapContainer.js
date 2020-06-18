import React from "react";
//import React, {Component} from 'react';
//import Map from './Map';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import { LocationContext } from "../context/LocationContext";

//import { GoogleComponent } from 'react-google-location'

Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

class MapContainer extends React.Component {
  static contextType = LocationContext;

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      address: "",
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    const { handleMapData } = this.context;
    // console.log(map);

    this.setState((prevState) => ({
      locations: [...prevState.locations, location],
    }));
    map.panTo(location);
    //get address from geocode
    Geocode.fromLatLng(location.lat(), location.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;

        this.setState({ address });
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
    setTimeout(
      () => handleMapData(location.lat(), location.lng(), this.state.address),
      1000
    );
  };

  render() {
    return (
      <div className="map-container">
        <Map
          // places={this.props.places} , position: "relative"
          style={{ width: "100%", height: "30%" }}
          google={this.props.google}
          className={"map"}
          zoom={10}
          initialCenter={{
            lat: 12.99628,
            lng: 80.249191,
          }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          onClick={this.handleMapClick}
        >
          {this.state.locations.map((location, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: location.lat(), lng: location.lng() }}
                // address={formatted_address}
              />
            );
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY,
})(MapContainer);
