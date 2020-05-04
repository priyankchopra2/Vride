import React, { Component } from "react";
import { CarContext } from "../context/CarContext";
import { EmpInfoContext } from "../context/EmpInfoContext";

class Car extends Component {
  state = {
    carModel: "",
    carBrand: "",
    carRegisterNumber: "",
    empId: "",
  };

  static contextType = CarContext;

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitForm = (e, emp) => {
    e.preventDefault();
    const { carModel, carBrand, carRegisterNumber } = this.state;
    const { handleAddCar } = this.context;
    console.log(
      "in submit function",
      carBrand,
      carModel,
      carRegisterNumber,
      emp
    );

    handleAddCar(carBrand, carModel, carRegisterNumber, emp);

    // const { username, password } = this.state;
    // let res = handleLogin(username, password);
  };
  // componentDidMount() {
  //   const { handleOnLoad } = this.context;
  //   handleOnLoad();
  // }
  render() {
    const { handleOnLoad, car, handleDelete } = this.context;
    return (
      <EmpInfoContext.Consumer>
        {(emp) => {
          const { empId } = emp;
          return (
            <div className="container" onMouseOver={() => handleOnLoad(empId)}>
              <h1>CAR Details</h1>
              <div className="row">
                <div className="col">
                  <h2>Saved Cars</h2>
                  <ul className="list-group">
                    {/* {empId} */}
                    {car.length ? (
                      car.map((i) => (
                        <li className="list-group-item" key={i.carId}>
                          <b>Brand:</b> {i.carBrand}
                          <br />
                          <b>Model:</b> {i.carModel}
                          <br />
                          <b>Reg no:</b> {i.carRegisterNumber}
                          <button
                            className="btn btn-danger float-right"
                            onClick={() => handleDelete(empId, i.carId)}
                          >
                            Delete
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No saved Cars</li>
                    )}
                  </ul>
                </div>
                <div className="col">
                  <h2>Add New Locations</h2>
                  <form onSubmit={(e) => this.submitForm(e, emp.employee)}>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">Car Brand</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Car Brand"
                        value={this.state.carBrand}
                        name="carBrand"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">Car Model</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Car Model"
                        value={this.state.carModel}
                        name="carModel"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group ">
                      <label for="exampleInputEmail1">
                        Car Registration Number
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Car Registration Number"
                        value={this.state.carRegisterNumber}
                        name="carRegisterNumber"
                        onChange={this.onChange}
                      />
                    </div>
                    <input
                      className="btn btn-info"
                      type="submit"
                      value="Add Car to List"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </EmpInfoContext.Consumer>
    );
  }
}

export default Car;
