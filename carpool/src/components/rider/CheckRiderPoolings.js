import React, { Component } from "react";
import { RiderContext } from "../../context/RiderContext";
import { EmpInfoContext } from "../../context/EmpInfoContext";

class CheckRiderPoolings extends Component {
  state = {};

  static contextType = RiderContext;

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
    const { rider, handleOnLoad } = this.context;

    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          const { empId } = emp;

          return (
            <div className="container" onMouseOver={() => handleOnLoad(empId)}>
              <h1>Your Riding Details</h1>
              <div className="row">
                <div className="col">
                  <ul className="list-group">
                    {/* {empId} */}
                    {rider.length ? (
                      rider.map((i) => (
                        <li
                          className="list-group-item p-4"
                          key={i.pooling.poolingId}
                        >
                          <div className="row ">
                            {i.isPaid ? (
                              <div className="badge-success">Amount Paid</div>
                            ) : (
                              <div>
                                <span className="badge-danger">Amount Due</span>
                                <button className="btn btn-sm btn-info ml-3">
                                  Pay
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <h4>Pooling Details</h4>
                            <br />

                            <div className="col">
                              <b>Start Location:</b>{" "}
                              {i.pooling.startLocation.locationAddress}
                              <br />
                              <b>Start Date:</b>{" "}
                              {this.handleDate(i.pooling.startTime)}
                              <br />
                              <b>Start Time:</b>{" "}
                              {this.handleTime(i.pooling.startTime)}
                              <br />
                              <b>CostPerHead:</b> {i.pooling.costPerHead}
                              <br />
                            </div>
                            <div className="col">
                              <b>Destination Location:</b>{" "}
                              {i.pooling.destinationLocation.branchName}
                              <br />
                              <b>Car:</b> {i.pooling.car.carBrand} ,{" "}
                              {i.pooling.car.carModel}
                              <br />
                              <b>Available Seats:</b> {i.pooling.availableSeats}
                            </div>
                            <div className="col-4">
                              <b>Return Date:</b>{" "}
                              {i.pooling.withReturn
                                ? this.handleDate(i.pooling.returnTime)
                                : "N/A"}
                              <br />
                              <b>Return Time:</b>{" "}
                              {i.pooling.withReturn
                                ? this.handleTime(i.pooling.returnTime)
                                : "N/A"}
                              <br />
                              <br />
                              <button
                                className="btn btn-danger float-right m-2"
                                // onClick={() => handleDelete(i.poolingId)}
                              >
                                Cancel
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

export default CheckRiderPoolings;
