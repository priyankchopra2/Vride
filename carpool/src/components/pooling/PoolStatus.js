import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class PoolStatus extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("carToken");
    let isCarPool = true;
    if (token == null) {
      isCarPool = false;
    }

    this.state = { isCarPool };
  }

  handleDelete = () => {
    if (this.state.isCarPool == true) {
      localStorage.removeItem("carToken");
      let isCarPool = false;
      this.setState({ isCarPool });
    }
  };

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/login" />;
    } else if (this.state.isCarPool == false) {
      return <Redirect to="/carpool" />;
    }
    return (
      <div className="container">
        <h1>carpool status</h1>
        fetch and display details here and give options for edit/delete the
        carpool
        <br />
        <button className="btn btn-danger" onClick={this.handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default PoolStatus;
