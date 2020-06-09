import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmpInfoContext } from "../context/EmpInfoContext";

class Dashboard extends Component {
  static contextType = EmpInfoContext;
  render() {
    const { isLogin, handleLogout, username, empId } = this.context;

    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <br />
        <h2>Welcome {username}</h2>
        <div className="row">
          <Link to="/" className="col" onClick={handleLogout}>
            Logout
          </Link>

          <Link to="/rider" className="col">
            See Rider Options
          </Link>
          <Link to="/carpool" className="col">
            See Carpool Options
          </Link>
          <Link to="/profile" className="col">
            Change profile
          </Link>
          <Link to="/history" className="col">
            Check history
          </Link>
          <Link to="/location" className="col">
            Check location
          </Link>
          <Link to="/car" className="col">
            Check Car Details
          </Link>
          <Link to="/checkpoolings" name={empId} className="col">
            Check All poolings
          </Link>
        </div>
        <hr />
        <h6>options we have here</h6>
        <p>
          to ride-->here check if ongoing carpool is there then show status of
          the carpool and provide options to edit or delete his details
          <br />
          #goto search page-->where the button to contact/check details of
          driver will be available by checking the token
        </p>
        <p>
          to carpool-->here check if ongoing carpool is there then show status
          of the carpool and provide options to edit or delete that carpool
          <br />
          #Ongoing carpool[Carpool status] (else) #Create new Carpool-->take
          journey details
        </p>
        <p>
          to change my profile-->in profile provide car details or saved
          locations or destinations
        </p>
        <p>check history </p>
      </div>
    );
  }
}

export default Dashboard;
