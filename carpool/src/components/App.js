import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Search2 from "./Search2";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Carpool from "./Carpool";
import PoolStatus from "./PoolStatus";
import Location from "./Location";
import EmpInfoContextProvider from "../context/EmpInfoContext";
import LocationContextProvider, {
  LocationContext,
} from "../context/LocationContext";
import CarContextProvider from "../context/CarContext";
import Car from "./Car";
import Profile from "./profile";

class App extends Component {
  state = {};
  render() {
    return (
      <EmpInfoContextProvider>
        <LocationContextProvider>
          <CarContextProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact={true}>
                  <Home />
                </Route>
                <Route path="/Search" exact={true}>
                  <Search />
                </Route>
                <Route path="/Login" exact={true}>
                  <Login />
                </Route>
                <Route path="/Logout" exact={true}>
                  <Logout />
                </Route>
                <Route path="/dashboard" exact={true}>
                  <Dashboard />
                </Route>
                <Route path="/Register" exact={true}>
                  <Register />
                </Route>
                <Route path="/carpool" exact={true}>
                  <Carpool />
                </Route>
                <Route path="/poolstatus" exact={true}>
                  <PoolStatus />
                </Route>
                <Route path="/location" exact={true}>
                  <Location />
                </Route>
                <Route path="/car" exact={true}>
                  <Car />
                </Route>
                <Route path="/profile" exact={true}>
                  <Profile />
                </Route>
                {/* <Route path="/Search2" exact={true} Component={Search2}>
            <Search2 />
          </Route> */}
              </Switch>
            </Router>
          </CarContextProvider>
        </LocationContextProvider>
      </EmpInfoContextProvider>
    );
  }
}

export default App;
