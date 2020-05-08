import React, { Component } from "react";
import { EmpInfoContext } from "../context/EmpInfoContext";
import { PoolContext } from "../context/PoolContext";
import { Link } from "react-router-dom";

class CheckPoolings extends Component {
  state = {};

  static contextType = PoolContext;

  // componentDidMount() {
  //   const { handleOnLoad } = this.context;
  //   handleOnLoad(this.state.empId);
  // }

  render() {
    const { handleOnLoad, pooling, handleDelete, handleEdit } = this.context;
    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          const { empId } = emp;

          return (
            <div className="container" onMouseOver={() => handleOnLoad(empId)}>
              <h1>Your Poolings</h1>
              <div className="row">
                <div className="col">
                  <ul className="list-group">
                    {/* {empId} */}
                    {pooling.length ? (
                      pooling.map((i) => (
                        <li className="list-group-item p-4" key={i.poolingId}>
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
                              <b>Car:</b> {i.car.carBrand} , {i.car.carModel}
                              <br />
                              <b>Available Seats:</b> {i.availableSeats}
                              <br />
                              <Link to="/editpooling">
                                <button
                                  className="btn btn-info m-2 float-right"
                                  onClick={() => handleEdit(i.poolingId)}
                                >
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="btn btn-danger float-right m-2"
                                onClick={() => handleDelete(i.poolingId)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No Location Saved</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default CheckPoolings;
