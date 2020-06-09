import React, { Component } from "react";
import { Link } from "react-router-dom";

class Carpool extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1>Carpool</h1>
        <div className="row mt-5">
          <div className="col">
            <h3>Create New Carpool</h3>
            <Link to="/CreateCarpool">
              <button className="btn btn-info">createcarpool</button>
            </Link>
          </div>
          <div className="col">
            <h3>Check All Carpools</h3>
            <Link to="/checkcarpoolings">
              <button className="btn btn-info">check all carpools</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Carpool;
