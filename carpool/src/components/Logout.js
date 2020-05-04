import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { EmpInfoContext } from "../context/EmpInfoContext";
class Logout extends Component {
  static contextType = EmpInfoContext;

  render() {
    const { isLogin, handleLogout } = this.context;
    if (isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h1>logout page</h1>
        <p>yaha sab aayega logout k baad</p>
        <Link to="/login">login again</Link>
      </div>
    );
  }
}

export default Logout;
