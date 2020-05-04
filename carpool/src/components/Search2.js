import React, { Component } from "react";
// import "../js/place.js";

class Search2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
    };
  }

  state = {};

  componentWillMount() {
    window.abc();
  }

  render() {
    return (
      <input
        type="text"
        id="des"
        placeholder="search here"
        onChange={(e) => {
          this.setState({ place: e });
        }}
      />
    );
  }
}

export default Search2;
