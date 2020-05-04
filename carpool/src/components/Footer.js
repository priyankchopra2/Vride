import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          position: "relative",
          background: "#343a40 ",
          color: "white",
        }}
      >
        <footer class="page-footer font-small ">
          <div class="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
