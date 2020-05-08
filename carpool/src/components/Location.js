import React, { Component } from "react";
import { LocationContext } from "../context/LocationContext";
import { EmpInfoContext } from "../context/EmpInfoContext";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class Location extends Component {
  state = {
    employee: [],
    locationName: "",
    locationLatitude: "",
    locationLongitude: "",
    address: "",
  };

  static contextType = LocationContext;

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e, emp) => {
    e.preventDefault();
    const { locationName, locationLatitude, locationLongitude } = this.state;
    const { handleAddLocation } = this.context;
    console.log(
      "in submit function",
      locationName,
      locationLatitude,
      locationLongitude,
      emp
    );
    handleAddLocation(locationName, locationLatitude, locationLongitude, emp);

    // const { username, password } = this.state;
    // let res = handleLogin(username, password);
  };

  //for maps and geolocation
  handleChange = (address) => {
    this.setState({ address });
    console.log(address);
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({
          locationLatitude: latLng.lat,
          locationLongitude: latLng.lng,
        });
      })
      .catch((error) => console.error("Error in map", error));
  };

  render() {
    const { location, handleOnLoad, handleDelete } = this.context;
    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          const { empId } = emp;
          return (
            <div className="container ">
              <h1>Locations</h1>

              <div className="row">
                <div className="col" onclick={handleOnLoad(empId)}>
                  <h2>Saved Locations</h2>
                  <ul className="list-group">
                    {/* {empId} */}
                    {location.length ? (
                      location.map((i) => (
                        <li className="list-group-item" key={i.locationId}>
                          {i.locationName}
                          <button
                            className="btn btn-danger float-right"
                            onClick={() => handleDelete(empId, i.locationId)}
                          >
                            Delete
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No Location Saved</li>
                    )}
                  </ul>
                </div>
                <div className="col">
                  <h2>Add New Locations</h2>
                  <div className="search row">
                    <form action="" method="get">
                      <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div className="col">
                            <input
                              {...getInputProps({
                                name: "destination",
                                placeholder: "Search here  ",
                                className: "form-control location-search-input",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <option onSelect={this.handleChange}>
                                      {suggestion.description}
                                    </option>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      {/* <div className="col">
                        <input
                          type="submit"
                          className="btn btn-info "
                          value="Get Longitude and Latitude"
                        />
                      </div> */}
                    </form>
                  </div>
                  <form onSubmit={(e) => this.submitForm(e, emp.employee)}>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">Location Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Location Name"
                        value={this.state.locationName}
                        name="locationName"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">Location Latitude</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Location Latitude"
                        value={this.state.locationLatitude}
                        name="locationLatitude"
                        onChange={this.onChange}
                        readOnly
                      />
                    </div>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">Location Longitude</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Location Longitude"
                        value={this.state.locationLongitude}
                        name="locationLongitude"
                        onChange={this.onChange}
                        readOnly
                      />
                    </div>
                    <input
                      className="btn btn-info"
                      type="submit"
                      value="Add Location"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default Location;
