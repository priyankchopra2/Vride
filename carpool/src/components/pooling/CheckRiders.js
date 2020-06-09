import React, { Component } from "react";
import { PoolContext } from "../../context/PoolContext";
import { Link } from "react-router-dom";

class CheckRiders extends Component {
  state = {};

  static contextType = PoolContext;

  render() {
    const { rider } = this.context;
    return (
      <div className="container">
        <h1>List Of Riders</h1>
        {rider.length ? (
          rider.map((i, index) => (
            <li className="list-group-item p-4" key={i.riderId}>
              <div className="row">
                <div className="col">
                  <span className="badge-info ">#{index + 1}</span>
                  <br />
                  <b>Rider Name :</b> {i.employee.empName}
                  <br />
                  <b>Rider Email:</b> {i.employee.empEmail}
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
          <li className="list-group-item">
            No Riders...Sorry We'll mail you when any rider will book this
            Pooling
          </li>
        )}
      </div>
    );
  }
}

export default CheckRiders;
