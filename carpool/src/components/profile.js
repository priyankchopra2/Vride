import React, { Component } from "react";
import { EmpInfoContext } from "../context/EmpInfoContext";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {};

  static contextType = EmpInfoContext;

  render() {
    const { employee } = this.context;
    return (
      <div className="container ">
        <h1>Profile</h1>
        <div className="row">
          <div className="col-3 ">
            Id:
            <input
              type="text"
              className="form-control"
              value={employee.empId}
              readOnly
            ></input>
          </div>
          <div className="col-3">
            Name:
            <input
              type="text"
              className="form-control"
              value={employee.empName}
              readOnly
            ></input>
          </div>
          <br />
          <div className="col-3">
            Date Of Birth:
            <input
              type="text"
              className="form-control"
              value={employee.empDOB}
              readOnly
            ></input>
          </div>

          <div className="col-3">
            Gender:
            <input
              type="text"
              className="form-control"
              value={employee.empGender}
              readOnly
            ></input>
          </div>

          <div className="col-5">
            Email id:
            <input
              type="text"
              className="form-control"
              value={employee.empEmail}
              readOnly
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <Link to="#">
              <button className="btn btn-info">Change Password</button>
            </Link>
          </div>
          <div className="col">
            <Link to="/location">
              <button className="btn btn-info">
                Add/Remove Location Details
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/car">
              <button className="btn btn-info">Add/Remove Car Details</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
