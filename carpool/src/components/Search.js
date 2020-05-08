import React, { Component } from "react";
import "./Search.css";
import { LocationContext } from "../context/LocationContext";
import { PoolContext } from "../context/PoolContext";
import { EmpInfoContext } from "../context/EmpInfoContext";
import { Link } from "react-router-dom";

class Search extends React.Component {
  static contextType = LocationContext;
  state = { branchId: "" };
  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e) => {
    e.preventDefault();
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
                const { isLogin } = emp;

                return (
                  <div className="container">
                    <h1>Search</h1>
                    <div class="dropdown ">
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
                    <button
                      className="btn btn-info"
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
                                    {i.startLocation.locationName}
                                    <br />
                                    <b>Start Date:</b> {i.startDate}
                                    <br />
                                    <b>Start Time:</b> {i.startTime}
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
                                    <b>Available Seats:</b> {i.availableSeats}
                                    <br />
                                    {isLogin ? (
                                      <button
                                        className="btn btn-danger float-right"
                                        // onClick={() => handleAddRider(emp, i)}
                                      >
                                        Book CarPool
                                      </button>
                                    ) : (
                                      <Link to="/login">
                                        <button className="btn btn-info float-right">
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
            </PoolContext.Consumer>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default Search;
