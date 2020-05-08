import React, { Component, createContext } from "react";
import { Redirect } from "react-router-dom";

export const SignUpContext = createContext();

class SignUpContextProvider extends Component {
  state = {
    data: [],
    isVerified: false,
    otpSendMsg: "",
    otpErrorMsg: "",
    isRedirected: false,
  };

  handleGenerateOtp = async (empId) => {
    let url = "api/user/signup/getOtp/" + empId;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404) {
          this.setState({
            data,
            otpSendMsg: (
              <div className="alert alert-success">Check Your mail for otp</div>
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleVerifyOtp = async (empId, otp) => {
    let url = "api/user/signup/verifyOtp/" + empId;
    let body = { [empId]: parseInt(otp, 10) };
    console.log("In otp", JSON.stringify(body));
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404) {
          this.setState({ isVerified: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({
          otpErrorMsg: (
            <div className="alert alert-danger m-2">Invalid Otp</div>
          ),
        });
      });
  };

  handleSignUp = async (empId, pass) => {
    let url = "api/user/signup/";
    let body = { id: empId.toString(), password: pass.toString() };
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404) {
          this.setState({ isRedirected: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <SignUpContext.Provider
        value={{
          ...this.state,
          handleGenerateOtp: this.handleGenerateOtp,
          handleVerifyOtp: this.handleVerifyOtp,
          handleSignUp: this.handleSignUp,
        }}
      >
        {this.props.children}
      </SignUpContext.Provider>
    );
  }
}

export default SignUpContextProvider;
