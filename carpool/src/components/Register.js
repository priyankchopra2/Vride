import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    let empid = "";
    this.state = { empid };
  }
  render() {
    return (
      <div className="container">
        <br />
        <h1>Sign up </h1>
        <h6>Please Enter your Employee Id Below</h6>
        <br />
        <form>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Employee ID"
              value={this.state.empid}
            />
            <input type="submit" className="btn btn-info m-2" value="Search" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
