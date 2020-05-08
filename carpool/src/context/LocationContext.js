import React, { Component, createContext } from "react";

export const LocationContext = createContext();

class LocationContextProvider extends Component {
  state = { location: [], newLocation: [], destination: [] };

  handleOnLoad = async (empid) => {
    const response = await fetch("api/" + empid + "/locations");
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ location: body });
  };

  handleAddLocation = async (
    locationName,
    locationLatitude,
    locationLongitude,
    emp
  ) => {
    // have to make post req sending the details
    let url = "api/add/location";
    let newLocation = {
      locationName: locationName.toString(),
      locationLatitude: parseFloat(locationLatitude),
      locationLongitude: parseFloat(locationLongitude),
      employee: emp,
    };
    this.setState({ newLocation });
    console.log("From locationContext" + JSON.stringify(newLocation));
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleDelete = (empid, locationid) => {
    let url = "api/location/delete/" + empid + "/" + locationid;
    console.log("DELETE from Location context ", empid, locationid);
    fetch(url, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleLoadDestination = async () => {
    console.log("in destination");
    const response = await fetch("api/pooling/destination");
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ destination: body });
  };

  render() {
    return (
      <LocationContext.Provider
        value={{
          ...this.state,
          handleOnLoad: this.handleOnLoad,
          handleAddLocation: this.handleAddLocation,
          handleDelete: this.handleDelete,
          handleLoadDestination: this.handleLoadDestination,
        }}
      >
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}

export default LocationContextProvider;
