import React, { Component, createContext } from "react";

export const CarContext = createContext();

class CarContextProvider extends Component {
  state = { car: [], newCar: [] };

  handleOnLoad = async (empid) => {
    const response = await fetch("api/" + empid + "/cars");
    const body = await response.json().catch((err) => console.log(err));
    this.setState({ car: body });
  };

  handleAddCar = (carBrand, carModel, carRegisterNumber, emp) => {
    // have to make post req sending the details
    let url = "api/add/car";
    let newCar = {
      carBrand: carBrand.toString(),
      carModel: carModel.toString(),
      carRegisterNumber: carRegisterNumber.toString(),
      employee: emp,
    };
    this.setState({ newCar });
    console.log("UPDATE From car context" + JSON.stringify(newCar));
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleDelete = (empid, carid) => {
    let url = "api/car/delete/" + empid + "/" + carid;
    console.log("DELETE from car context ", empid, carid);
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
      <CarContext.Provider
        value={{
          ...this.state,
          handleOnLoad: this.handleOnLoad,
          handleAddCar: this.handleAddCar,
          handleDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </CarContext.Provider>
    );
  }
}

export default CarContextProvider;
