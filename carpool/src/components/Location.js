import React, { Component } from "react";
import { LocationContext } from "../context/LocationContext";
import { EmpInfoContext } from "../context/EmpInfoContext";

class Location extends Component {
  state = {
    employee: [],
    locationName: "",
    locationLatitude: 12.784984,
    locationLongitude: 78.715707,
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

  render() {
    const { location, handleOnLoad } = this.context;
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
                          <button className="btn btn-danger float-right">
                            {/* onClick={() => handleDelete(empId, i.carId)} */}
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
