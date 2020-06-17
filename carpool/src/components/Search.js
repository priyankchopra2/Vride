import React, { Component } from "react";
import "./Search.css";
import { LocationContext } from "../context/LocationContext";
import { PoolContext } from "../context/PoolContext";
import { EmpInfoContext } from "../context/EmpInfoContext";
import { Link } from "react-router-dom";
import { RiderContext } from "../context/RiderContext";

class Search extends React.Component {
  static contextType = LocationContext;
  state = { branchId: "", isPaid: false };
  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e) => {
    e.preventDefault();
  };

  handleDate = (date) => {
    var nowDate = new Date(date);
    var date =
      nowDate.getDate() +
      "-" +
      (nowDate.getMonth() + 1) +
      "-" +
      nowDate.getFullYear();
    return date;
  };

  handleTime = (date) => {
    var nowDate = new Date(date);
    var time = nowDate.getHours() + ":" + nowDate.getMinutes();
    return time;
  };

  render() {
    const { handleLoadDestination, destination } = this.context;
    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          return (
            <PoolContext.Consumer>
              {(pool) => {
                const { handleSearchByDestination, pooling } = pool;
                const { isLogin, empId, employee } = emp;

                return (
                  <RiderContext.Consumer>
                    {(riderCon) => {
                      const { handleAddRider, riderMsg } = riderCon;
                      return (
                        <div className="container">
                          <h1>Search</h1>

                          <div class="row">
                            <h6>SORT BY: </h6>
                            <div className="col">
                              Select Destination
                              <select
                                class="btn border dropdown-toggle m-2"
                                type="button"
                                onFocus={() => handleLoadDestination()}
                                onChange={this.onChange}
                                // value={this.state.destination}
                                name="branchId"
                              >
                                <option>Select Location</option>

                                {destination.length ? (
                                  destination.map((i) => (
                                    <option
                                      className="list-group-item"
                                      key={i.branchId}
                                      value={i.branchId}
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
                          </div>
                          <button
                            className="btn btn-info mb-5"
                            onClick={() =>
                              handleSearchByDestination(this.state.branchId)
                            }
                          >
                            Search
                          </button>

                          <div className="row">
                            <div className="col">
                              <ul className="list-group">
                                {/* {empId} */}
                                {pooling.length ? (
                                  pooling.map((i) => (
                                    <li
                                      className="list-group-item p-4"
                                      key={i.poolingId}
                                    >
                                      <div className="row">
                                        <div className="col-4">
                                          <b>Start Location:</b>{" "}
                                          {i.startLocation.locationAddress}
                                          <br />
                                          <b>Start Date:</b>
                                          {this.handleDate(i.startTime)}
                                          <br />
                                          <b>Start Time:</b>
                                          {this.handleTime(i.startTime)}
                                          <br />
                                          <b>CostPerHead:</b> {i.costPerHead}
                                          <br />
                                        </div>
                                        <div className="col">
                                          <b>Destination Location:</b>{" "}
                                          {i.destinationLocation.branchName}
                                          <br />
                                          <b>Car:</b> {i.car.carBrand} ,{" "}
                                          {i.car.carModel}
                                          <br />
                                          <b>Available Seats:</b>{" "}
                                          {i.availableSeats}
                                          <br />
                                          <br />
                                          <br />
                                          {riderMsg}
                                        </div>
                                        <div className="col-4">
                                          <b>Return Date:</b>{" "}
                                          {i.withReturn
                                            ? this.handleDate(i.returnTime)
                                            : "N/A"}
                                          <br />
                                          <b>Return Time:</b>{" "}
                                          {i.withReturn
                                            ? this.handleTime(i.returnTime)
                                            : "N/A"}
                                          <br />
                                          <br />
                                          {isLogin ? ( //if login
                                            empId == i.employee.empId ||
                                            i.availableSeats <= 0 ? (
                                              //if provider and rider are same
                                              <button
                                                className="btn btn-warning float-right"
                                                title="Provider and Rider are same"
                                                disabled
                                              >
                                                Book CarPool
                                              </button>
                                            ) : (
                                              // if everything is fine Book the rider
                                              <button
                                                className="btn btn-info float-right"
                                                onClick={() =>
                                                  handleAddRider(
                                                    i.startLocation,
                                                    employee,
                                                    i,
                                                    this.state.isPaid
                                                  )
                                                }
                                              >
                                                Book CarPool
                                              </button>
                                            )
                                          ) : (
                                            <Link to="/login">
                                              <button
                                                className="btn btn-danger float-right"
                                                title="Login to Book Ride"
                                              >
                                                Book CarPool
                                              </button>
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                ) : (
                                  <li className="list-group-item">
                                    No Pooling in this Destination
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </RiderContext.Consumer>
                );
              }}
            </PoolContext.Consumer>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default Search;
