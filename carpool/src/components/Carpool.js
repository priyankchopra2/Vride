import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
class Carpool extends Component {
  constructor(props) {
    this.state = {
      IsCarPool: false,
      startLocation: "Vellore",
      destination: ["virtusa 1", "virtusa 2", "virtusa 3"],
      startTime: "12:00",
      startDate: "01-29-1997",
      seatsAvailable: 4,
      costPerSeat: 0,
      car: ["wagon r", "toyota"],
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (this.state.IsCarPool == false) {
      localStorage.setItem("carToken", "ye car ka h");
      this.setState({ IsCarPool: true });
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/login" />;
    } else if (this.state.IsCarPool == true) {
      return <Redirect to="/poolstatus" />;
    }
    return (
      <div className="container">
        <h1>Create Carpool</h1>
        <hr />
        <div>
          <form action="" onSubmit={(e) => this.submitForm(e)}>
            {/* here give the link of backend to store the carpool data */}
            <div className="row">
              <div class="form-group col">
                <label for="exampleInputEmail1">
                  Starting Point / Your location
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Starting Point / Your location"
                  value={this.state.startLocation}
                  name="startLocation"
                  onChange={this.onChange}
                />
              </div>

              <div class="dropdown ">
                Select Destination
                <br />
                <select class="btn border dropdown-toggle m-2" type="button">
                  <option>Select Destination</option>
                  Dropdown button
                  {this.state.destination.map((destination, index) => (
                    <option key={index}>{destination}</option>
                  ))}
                </select>
              </div>
              {/* <div class="dropdown col">
                <label for="exampleInputEmail1">Destination</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Destination"
                  name="destination"
                  onChange={this.onChange}
                  value={this.state.destination}
                />
              </div> */}

              <div class="form-group col">
                <label for="exampleInputEmail1">Carpool Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Starting Point / Your location"
                  value={this.state.startDate}
                  name="startDate"
                  onChange={this.onChange}
                />
              </div>

              <div class="form-group col">
                <label for="exampleInputEmail1">Carpool Start Time</label>
                <input
                  type="time"
                  class="form-control"
                  placeholder="Starting Point / Your location"
                  value={this.state.startTime}
                  name="startTime"
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className=" form-group col-2 m-4">
                <select class="btn border dropdown-toggle">
                  <option selected>select car from list</option>

                  {this.state.car.map((car, index) => (
                    <option key={index}>{car}</option>
                  ))}
                </select>
                <br />
                <Link to="/" className="m-2">
                  Add new/delete Car
                </Link>
              </div>

              <div class="form-group col">
                <label for="exampleInputEmail1">Seats Available</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="Number of Seats available"
                  value={this.state.seatsAvailable}
                  name="seatsAvailable"
                  onChange={this.onChange}
                />
              </div>

              <div class="form-group col">
                <label for="exampleInputEmail1">Cost Per Seat</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Cost per Seat"
                  value={this.state.costPerSeat}
                  name="costPerSeat"
                  onChange={this.onChange}
                  min="0"
                />
              </div>
            </div>

            <input
              type="submit"
              className="btn btn-info"
              value="Create CarPool"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </form>
        </div>

        {/* <p>
          to carpool-->here check if ongoing carpool is there then show status
          of the carpool and provide options to edit or delete that carpool
          <br />
          #Ongoing carpool[Carpool status] (else) #Create new Carpool-->take
          journey details
        </p>

        <h1>
          If carpool status is true..there is one ongoing carpool...show below
        </h1>
        <div>details of carpool-> fetch carpool details from table </div>

        <h1>If carpool status is false..Create new carpool</h1> */}
      </div>
    );
  }
}

export default Carpool;
