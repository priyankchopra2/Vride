import React, { Component, createContext } from "react";

export const EmpInfoContext = createContext();

class EmpInfoContextProvider extends Component {
  state = {
    employee: [],
    isLogin: false,
    username: "",
    empId: "",
    error: "",
  };

  handleLogin = async (username, password) => {
    try {
      const response = await fetch(
        "api/user/login/" + username + "/" + password
      );
      const body = await response.json().catch((err) => console.log(err));
      this.setState({
        employee: body,
        username: body.empName,
        empId: body.empId,
        isLogin: true,
      });
    } catch (error) {
      console.log("yaha error dikha ra tha emp context se");
      this.setState({
        error: <div className="alert alert-danger">Invalid Credentials</div>,
      });
    }
  };

  handleLogout = () => {
    this.setState({
      employee: [],
      isLogin: false,
      username: "",
      error: "",
      empId: "",
    });
  };

  render() {
    return (
      <EmpInfoContext.Provider
        value={{
          ...this.state,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </EmpInfoContext.Provider>
    );
  }
}

export default EmpInfoContextProvider;
