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
import CreateCarpool from "./pooling/CreateCarpool";
import PoolStatus from "./pooling/PoolStatus";
import Location from "./Location";
import Car from "./Car";
import Profile from "./profile";
import CheckPoolings from "./pooling/CheckPoolings";
import EditPooling from "./pooling/EditPooling";
import SearchWithMap from "./SearchWithMap";
import Carpool from "./pooling/Carpool";
import Rider from "./rider/Rider";
import CheckRiderPoolings from "./rider/CheckRiderPoolings";
import CheckRiders from "./pooling/CheckRiders";
import MapContainer from "./MapContainer";

class App extends Component {
  componentWillMount() {
    console.log("in component will mount");
    const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=abc`;
    document.body.insertBefore(script, document.body.childNodes[8]);
  }
  state = {};
  render() {
    return (
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
          <Route path="/register" exact={true}>
            <Register />
          </Route>
          <Route path="/CreateCarpool" exact={true}>
            <CreateCarpool />
          </Route>
          <Route path="/checkcarpoolings" exact={true}>
            <CheckPoolings />
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
          <Route path="/checkpoolings" exact={true}>
            <CheckPoolings />
          </Route>

          <Route path="/editpooling" exact={true}>
            <EditPooling />
          </Route>

          <Route path="/search2" exact={true}>
            <SearchWithMap />
          </Route>

          <Route path="/rider" exact={true}>
            <Rider />
          </Route>

          <Route path="/checkriderpoolings" exact={true}>
            {/* Checking Pooling details of rider from rider a/c*/}
            <CheckRiderPoolings />
          </Route>

          <Route path="/checkRiders" exact={true}>
            {/* Checking riders from provider poolings ...who all are riders */}
            <CheckRiders />
          </Route>

          {/* <Route path="/Search2" exact={true} Component={Search2}>
            <Search2 />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
