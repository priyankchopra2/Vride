import React, { Component } from "react";
import SignUpContextProvider, { SignUpContext } from "../context/SignUpContext";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = { empid: "", otp: 0, pass: "" };

  static contextType = SignUpContext;

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e) => {
    const { handleGenerateOtp } = this.context;
    e.preventDefault();
    handleGenerateOtp(this.state.empid);
  };

  render() {
    const {
      handleVerifyOtp,
      isVerified,
      handleSignUp,
      otpSendMsg,
      otpErrorMsg,
      isRedirected,
    } = this.context;
    let notVerified = (
      <div className="row mt-5">
        <div className="col">
          <input
            type="text"
            onChange={this.onChange}
            placeholder="Enter your Password here"
            name="pass"
            className="form-control"
            readOnly
          />
        </div>
        <div className="col">
          <button
            className="btn btn-info"
            // onClick={() => handleSignUp(this.state.empid, this.state.pass)}
            disabled
          >
            Enter Password
          </button>
        </div>
      </div>
    );

    let verified = (
      <div>
        <div className="row mt-5">
          <div className="col">
            <input
              type="password"
              onChange={this.onChange}
              placeholder="Enter you Password here"
              name="pass"
              className="form-control"
            />
          </div>
          <div className="col">
            <button
              className="btn btn-info"
              onClick={() => handleSignUp(this.state.empid, this.state.pass)}
            >
              Enter Password
            </button>{" "}
            <div className="alert alert-success m-4">
              otp verified you can enter Password now{" "}
            </div>
          </div>
        </div>
      </div>
    );

    if (isRedirected) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="container">
        <br />
        <h1>Sign up </h1>
        <h6>Please Enter your Employee Id Below</h6>
        <br />
        <form onSubmit={this.submitForm}>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                placeholder="Employee ID"
                name="empid"
                onChange={this.onChange}
              />
            </div>
            <div className="col">
              <input
                type="submit"
                className="btn btn-info m-2"
                value="Generate Otp"
              />
              {otpSendMsg}
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                onChange={this.onChange}
                name="otp"
                placeholder="Enter otp here"
              />
            </div>{" "}
            <div className="col">
              <button
                className="btn btn-info"
                onClick={() =>
                  handleVerifyOtp(this.state.empid, this.state.otp)
                }
              >
                Verify Otp
              </button>
              <br />
              {otpErrorMsg}
            </div>
          </div>
          {isVerified ? verified : notVerified}
        </form>
      </div>
    );
  }
}

export default Register;
