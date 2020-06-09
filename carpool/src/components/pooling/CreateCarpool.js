import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { EmpInfoContext } from "../../context/EmpInfoContext";
import { LocationContext } from "../../context/LocationContext";
import { CarContext } from "../../context/CarContext";
import { PoolContext } from "../../context/PoolContext";
class CreateCarpool extends Component {
  state = {
    startDateTime: "",
    check: false,
    returnDateTime: "",
    costPerHead: 0.0,
    availableSeats: 0,
    startLocation: [],
    destination: [],
    car: [],
  };
  static contextType = PoolContext;

  submitForm = (e) => {
    const { handleAddCarPool } = this.context;
    e.preventDefault();
    const {
      check,
      returnDateTime,
      startDateTime,
      costPerHead,
      availableSeats,
      startLocation,
      destination,
      car,
    } = this.state;

    let employee = car.employee;

    handleAddCarPool(
      startLocation,
      startDateTime,
      check,
      returnDateTime,
      costPerHead,
      destination,
      employee,
      car,
      availableSeats
    );
  };

  onChange = (e) => {
    if (
      e.target.name == "destination" ||
      e.target.name == "startLocation" ||
      e.target.name == "car"
    ) {
      this.setState({
        [e.target.name]: JSON.parse(e.target.value),
      });
    } else {
      this.setState({
        [e.target.name]: [e.target.value],
      });
    }
  };

  handleCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.checked ? true : false,
    });
  };

  render() {
    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          const { empId } = emp;
          return (
            <LocationContext.Consumer>
              {(loc) => {
                const {
                  location,
                  handleOnLoad,
                  handleLoadDestination,
                  destination,
                } = loc;
                return (
                  <CarContext.Consumer>
                    {(carCon) => {
                      const { car } = carCon;
                      const { msg } = this.context;
                      return (
                        <div className="container">
                          <h1>Create Carpool</h1>
                          <form onSubmit={this.submitForm}>
                            <div className="row mt-4 mb-4">
                              <div class="dropdown col">
                                Start Location
                                <select
                                  class="btn border dropdown-toggle m-2"
                                  type="button"
                                  onFocus={() => handleOnLoad(empId)}
                                  onChange={this.onChange}
                                  name="startLocation"
                                  // value={location}
                                >
                                  <option>Select Location</option>

                                  {location.length ? (
                                    location.map((i) => (
                                      <option
                                        className="list-group-item"
                                        key={i.locationId}
                                        value={JSON.stringify(i)}
                                      >
                                        {i.locationName}
                                      </option>
                                    ))
                                  ) : (
                                    <option className="list-group-item">
                                      No Location Saved
                                    </option>
                                  )}
                                </select>
                                <Link to="/location">Add/Remove Location</Link>
                              </div>

                              <div class="dropdown col">
                                Select Destination
                                <select
                                  class="btn border dropdown-toggle m-2"
                                  type="button"
                                  onFocus={() => handleLoadDestination()}
                                  onChange={this.onChange}
                                  // value={this.state.destination}
                                  name="destination"
                                >
                                  <option>Select Location</option>

                                  {destination.length ? (
                                    destination.map((i) => (
                                      <option
                                        className="list-group-item"
                                        key={i.branchId}
                                        value={JSON.stringify(i)}
                                      >
                                        {i.branchName}
                                      </option>
                                    ))
                                  ) : (
                                    <option className="list-group-item">
                                      No Destination Saved
                                    </option>
                                  )}
                                </select>
                              </div>

                              <div class=" form-group col">
                                Start Date and time
                                <input
                                  class="form-control"
                                  name="startDateTime"
                                  type="datetime-local"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-4 ml-4 form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="check"
                                  onChange={(e) => this.handleCheck(e)}
                                  placeholder="return"
                                />
                                <label class="col-11 col-form-label">
                                  Want to do return carpool also?
                                </label>
                              </div>
                              {this.state.check ? (
                                <div class=" form-group col-4">
                                  <label class="col-form-label">
                                    Return Date and time
                                  </label>

                                  <input
                                    class="form-control"
                                    name="returnDateTime"
                                    type="datetime-local"
                                    onChange={this.onChange}
                                  />
                                </div>
                              ) : (
                                <div class=" form-group col-4">
                                  <label class=" col-form-label">
                                    Return Date and time
                                  </label>
                                  {(this.state.returnDateTime = null)}
                                  <input
                                    class="form-control"
                                    name="returnDateTime"
                                    type="datetime-local"
                                    onChange={this.onChange}
                                    disabled
                                  />
                                </div>
                              )}
                            </div>
                            {/* 
                              <div class="form-group col-3">
                                <label for="exampleInputEmail1">
                                  Carpool Start Date
                                </label>
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Starting Point / Your location"
                                  name="startDate"
                                  onChange={this.onChange}
                                />
                              </div>

                              <div class="form-group col-3">
                                <label for="exampleInputEmail1">
                                  Carpool Start Time
                                </label>
                                <input
                                  type="time"
                                  class="form-control"
                                  placeholder="Starting Point / Your location"
                                  value={this.state.startTime}
                                  name="startTime"
                                  onChange={this.onChange}
                                />
                              </div> */}

                            <div className="row mt-4">
                              <div class="dropdown col-3 ">
                                Select Car
                                <br />
                                <select
                                  class="btn border dropdown-toggle m-2"
                                  type="button"
                                  onFocus={() => carCon.handleOnLoad(empId)}
                                  onChange={this.onChange}
                                  name="car"
                                >
                                  <option>Select Car</option>

                                  {car.length ? (
                                    car.map((i) => (
                                      <option
                                        className="list-group-item"
                                        key={i.carId}
                                        value={JSON.stringify(i)}
                                      >
                                        {i.carBrand}
                                        {i.carModel}
                                      </option>
                                    ))
                                  ) : (
                                    <option className="list-group-item">
                                      No Location Saved
                                    </option>
                                  )}
                                </select>
                                <Link to="/car">Add/Remove Car</Link>
                              </div>
                              <div class="form-group col">
                                <label for="exampleInputEmail1">
                                  Seats Available
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  class="form-control"
                                  placeholder="Number of Seats available"
                                  name="availableSeats"
                                  onChange={this.onChange}
                                  max="6"
                                />
                              </div>
                              <div class="form-group col">
                                <label for="exampleInputEmail1">
                                  Cost Per Seat
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Enter Cost per Seat"
                                  name="costPerHead"
                                  onChange={this.onChange}
                                  min="0"
                                />
                              </div>
                            </div>
                            <input
                              type="submit"
                              className="btn btn-info float-right"
                              value="Create CarPool"
                            />
                            {msg}
                          </form>
                        </div>
                      );
                    }}
                  </CarContext.Consumer>
                );
              }}
            </LocationContext.Consumer>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default CreateCarpool;
