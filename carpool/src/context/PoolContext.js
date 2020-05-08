import React, { Component, createContext } from "react";

export const PoolContext = createContext();

class PoolContextProvider extends Component {
  state = { pooling: [], editPooling: [], isEdit: false, isUpdated: false };

  handleAddCarPool = async (
    startLocation,
    startDate,
    startTime,
    costPerHead,
    destination,
    employee,
    car,
    availableSeats
  ) => {
    let url = "api/add/pooling";
    let pooling = {
      startLocation,
      startDate: startDate.toString(),
      startTime: startTime.toString() + ":00",
      costPerHead: parseFloat(costPerHead),
      destinationLocation: destination,
      employee,
      car,
      availableSeats: parseInt(availableSeats, 10),
    };
    console.log("In Carpool Context", JSON.stringify(pooling));

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pooling),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404) {
          this.setState({ pooling: data });
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

  handleOnLoad = async (empid) => {
    const response = await fetch("api/poolings/" + empid);
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ pooling: body });
  };
  // api/delete/pooling/id
  handleDelete = (id) => {
    let url = "api/delete/pooling/" + id;
    console.log("DELETE from Location context ", id);
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

  handleSearchByDestination = async (desId) => {
    const response = await fetch("api/poolings/destination/" + desId);
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ pooling: body });
  };

  handleEdit = async (poolingId) => {
    //for click button for edit pooling
    const response = await fetch("api/pooling/" + poolingId);
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ editPooling: body, isEdit: true });
  };

  handleEditCarPool = async (
    poolingId,
    startLocation,
    startDate,
    startTime,
    costPerHead,
    destination,
    employee,
    car,
    availableSeats
  ) => {
    let url = "api/update/pooling/";
    let pooling = {
      poolingId: parseInt(poolingId, 10),
      startLocation,
      startDate: startDate.toString(),
      startTime: startTime.toString(),
      costPerHead: parseFloat(costPerHead),
      destinationLocation: destination,
      employee,
      car,
      availableSeats: parseInt(availableSeats, 10),
    };
    console.log("In Carpool Context", JSON.stringify(pooling));

    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pooling),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status != 404 && data.status != 400) {
          this.setState({ pooling: data, isUpdated: true });
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

  render() {
    return (
      <PoolContext.Provider
        value={{
          ...this.state,
          handleAddCarPool: this.handleAddCarPool,
          handleOnLoad: this.handleOnLoad,
          handleDelete: this.handleDelete,
          handleSearchByDestination: this.handleSearchByDestination,
          handleEdit: this.handleEdit,
          handleEditCarPool: this.handleEditCarPool,
        }}
      >
        {this.props.children}
      </PoolContext.Provider>
    );
  }
}

export default PoolContextProvider;
