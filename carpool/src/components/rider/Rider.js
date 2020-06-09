import React, { Component } from "react";
import { Link } from "react-router-dom";

class Rider extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1>Rider</h1>

        <div className="row mt-5">
          <div className="col">
            {/* <div
              class="card border-primary mb-3"
              style={{ maxWidth: "18rem", textAlign: "center" }}
            >
              <div class="card-header">
                <h5 class="card-title text-primary">Want To Ride</h5>
              </div>
              <div class="card-body text-primary">
                <Link to="/search">
                  <button className="btn btn-info">TAKE RIDE</button>
                </Link>
              </div>
            </div> */}

            <h3>Want To Ride</h3>
            <Link to="/search">
              <button className="btn btn-info">TAKE RIDE</button>
            </Link>
          </div>

          <div className="col">
            <h3>Check All Carpools</h3>
            <Link to="/checkRiderPoolings">
              <button className="btn btn-info">check History</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Rider;
