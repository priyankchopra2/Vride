import React, { Component } from "react";
import { Link } from "react-router-dom";
import { EmpInfoContext } from "../context/EmpInfoContext";

class Navbar extends Component {
  static contextType = EmpInfoContext;

  render() {
    const { isLogin, username, handleLogout } = this.context;
    console.log("from navbar" + isLogin);
    let logout, login;

    login = (
      <li className="nav-item">
        <a href="/login" className="nav-link">
          Login
        </a>
      </li>
    );

    logout = (
      <li className="nav-item dropdown ">
        <Link
          class="nav-link dropdown-toggle"
          to="/"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {username}
        </Link>
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <Link class="dropdown-item" to="/" onClick={handleLogout}>
            Logout
          </Link>
          <Link class="dropdown-item" to="/dashboard">
            Dashboard
          </Link>
          <div class="dropdown-divider"></div>
          <Link class="dropdown-item" href="#">
            Something else here
          </Link>
        </div>
      </li>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <Link className="navbar-brand" href="/">
              <font color="aqua">V</font> RIDE
            </Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item ">{isLogin ? logout : login}</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
