import React, { Component } from "react";
import "./Home.css";
import { Button, h1 } from "reactstrap";
import coverVid from "../resources/2.mp4";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div style={{ position: "relative" }}>
        <video className="background-video" loop autoPlay>
          <source src={coverVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <h1>
            Welcome to <font color="blue">Virtusa</font> CarPool
          </h1>
          <br />
          <h1>Select Any One Option</h1>
          <br />
          <span className="col-md-4">
            <Link to="/search">
              <Button className="btn-info">Want to Ride</Button>
            </Link>
          </span>
          <span className="col-md-4">
            <Link to="/login">
              <Button className="btn-info">Want to CarPool</Button>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Home;
