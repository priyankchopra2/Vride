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

  handleDelete = (empid) => {
    //it is sending error will check it later
    let url = "api/user/delete/" + empid;
    console.log("DELETE User from EmpInfo  context ", empid);
    fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response)
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404) {
          this.setState({ isLogin: false });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <EmpInfoContext.Provider
        value={{
          ...this.state,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </EmpInfoContext.Provider>
    );
  }
}

export default EmpInfoContextProvider;
