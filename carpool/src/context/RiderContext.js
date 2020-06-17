import React, { Component, createContext } from "react";

export const RiderContext = createContext();

class RiderContextProvider extends Component {
  state = { rider: [], riderMsg: "", ErrorMsg: "" };

  handleAddRider = async (startLocation, employee, pooling, isPaid) => {
    let url = "api/add/rider";

    let rider = { startLocation, employee, pooling, isPaid };

    console.log("In RIDER Context", JSON.stringify(rider));

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rider),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404 && data.status != 400) {
          this.setState({
            rider: data,
            riderMsg: (
              <div className="alert alert-success m-3">
                Your Booking is Successfull and Mail Sent to Provider
              </div>
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({
          ErrorMsg: <div className="alert alert-danger m-2">Error</div>,
        });
      });
  };

  handleOnLoad = async (empid) => {
    const response = await fetch("api/rider/" + empid);
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ rider: body });
  };

  handleDelete = (id) => {
    let url = "api/delete/rider/" + id;
    console.log("DELETE from RIDER context ", id);
    fetch(url, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <RiderContext.Provider
        value={{
          ...this.state,
          handleAddRider: this.handleAddRider,
          handleOnLoad: this.handleOnLoad,
          handleDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </RiderContext.Provider>
    );
  }
}

export default RiderContextProvider;
