import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { PoolContext } from "../../context/PoolContext";
import { EmpInfoContext } from "../../context/EmpInfoContext";
import { LocationContext } from "../../context/LocationContext";
import { CarContext } from "../../context/CarContext";
// import { PoolContext } from "../context/PoolContext";

class EditPooling extends Component {
  static contextType = PoolContext;

  state = {
    poolingId: "",
    startDateTime: "",
    check: false,
    returnDateTime: "",
    costPerHead: 0.0,
    availableSeats: 0,
    startLocation: [],
    destination: [],
    car: [],
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

  submitForm = (e) => {
    const { handleEditCarPool } = this.context;
    e.preventDefault();
    const {
      poolingId,
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

    handleEditCarPool(
      poolingId,
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
  handleDate = (date) => {
    var nowDate = new Date(date);
    console.log(nowDate);
    return nowDate;
  };
  render() {
    const { editPooling, isEdit, isUpdated } = this.context;
    if (!isEdit) {
      return <div>LOadingg.....</div>;
    } else if (isUpdated) {
      return <Redirect to="/checkpoolings"></Redirect>;
    } else {
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

                        return (
                          <div className="container">
                            <h1>Create Carpool</h1>
                            <form
                              onSubmit={this.submitForm}
                              onMouseOver={this.onChange}
                            >
                              <div className="row mt-4">
                                <div className="col">
                                  <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    value={
                                      (this.state.poolingId =
                                        editPooling.poolingId)
                                    }
                                    name="poolingId"
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div class="dropdown col-3">
                                  Start Location
                                  <select
                                    class="btn border dropdown-toggle m-2"
                                    type="button"
                                    onFocus={() => handleOnLoad(empId)}
                                    onChange={this.onChange}
                                    name="startLocation"
                                    defaultValue={editPooling.startLocation}
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
                                      <option
                                        className="list-group-item"
                                        selected
                                      >
                                        {editPooling.startLocation.locationName}
                                      </option>
                                    )}
                                  </select>
                                  <Link to="/location">
                                    Add/Remove Location
                                  </Link>
                                </div>

                                <div class="dropdown col-3">
                                  Select Destination
                                  <select
                                    class="btn border dropdown-toggle m-2"
                                    type="button"
                                    onFocus={() => handleLoadDestination()}
                                    onChange={this.onChange}
                                    defaultValue={
                                      editPooling.destinationLocation
                                    }
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
                                      <option
                                        className="list-group-item"
                                        selected
                                      ></option>
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
                                    Value={editPooling.startTime}
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
                                    defaultValue={editPooling.withReturn}
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
                                      defaultValue={editPooling.returnTime}
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

                                <div class="dropdown col-3 mt-4">
                                  Select Car
                                  <br />
                                  <select
                                    class="btn border dropdown-toggle m-2"
                                    type="button"
                                    onFocus={() => carCon.handleOnLoad(empId)}
                                    onChange={this.onChange}
                                    name="car"
                                    defaultValue={
                                      editPooling.car.carBrand +
                                      " " +
                                      editPooling.car.carModel
                                    }
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
                                      <option
                                        className="list-group-item"
                                        selected
                                      ></option>
                                    )}
                                  </select>
                                  <br />
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
                                    defaultValue={editPooling.availableSeats}
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
                                    defaultValue={editPooling.costPerHead}
                                    onChange={this.onChange}
                                    min="0"
                                  />
                                </div>
                              </div>
                              <input
                                type="submit"
                                className="btn btn-info float-right"
                                value="Edit CarPool"
                              />
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
        // <div className="container">
        //   <h1>Update Pooling</h1>

        //   <li className="list-group-item p-4" key={editPooling.poolingId}>
        //     <div className="row">
        //       <div className="col-4">
        //         <b>Start Location:</b> {editPooling.startLocation.locationName}
        //         <br />
        //         <b>Start Date:</b> {editPooling.startDate}
        //         <br />
        //         <b>Start Time:</b> {editPooling.startTime}
        //         <br />
        //         <b>CostPerHead:</b> {editPooling.costPerHead}
        //         <br />
        //       </div>
        //       <div className="col">
        //         <b>Destination Location:</b>{" "}
        //         {editPooling.destinationLocation.branchName}
        //         <br />
        //         <b>Car:</b> {editPooling.car.carBrand} ,{" "}
        //         {editPooling.car.carModel}
        //         <br />
        //         <b>Available Seats:</b> {editPooling.availableSeats}
        //         <br />
        //       </div>
        //     </div>
        //   </li>
        // </div>
      );
    }
  }
}

export default EditPooling;
