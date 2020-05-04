import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { EmpInfoContext } from "../context/EmpInfoContext";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      Islogin: false,
    };
  }

  static contextType = EmpInfoContext;

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e) => {
    const { handleLogin, isLogin } = this.context;
    this.setState({ isLogin });
    e.preventDefault();
    const { username, password } = this.state;
    let res = handleLogin(username, password);

    console.log("res ki value" + res);

    // if (username == "a" && password == "b") {
    //   localStorage.setItem("token", this.state.username);
    //   this.setState({ Islogin: true });
    // }
  };

  render() {
    const { handleLogin, isLogin, error } = this.context;

    if (isLogin) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={(e) => this.submitForm(e)} method="get">
            <div className="row">
              <div className="col-3">
                Enter Username
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="username"
                  onChange={this.onChange}
                  required
                />
                Enter Password
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  placeholder="password"
                  required
                />
                <input
                  className="btn btn-info m-2 "
                  type="submit"
                  value="login"

                  // onClick={() => window.location.reload(false)}
                />
                {error}
              </div>

              <div className="col-1"></div>
              <div className="col">
                <h1>New Employee?</h1>
                <Link to="/register">
                  <h4>Register here </h4>
                </Link>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;
