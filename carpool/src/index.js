import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpContextProvider from "./context/SignUpContext";
import PoolContextProvider from "./context/PoolContext";
import EmpInfoContextProvider from "./context/EmpInfoContext";
import LocationContextProvider from "./context/LocationContext";
import CarContextProvider from "./context/CarContext";
import RiderContextProvider from "./context/RiderContext";

ReactDOM.render(
  <React.StrictMode>
    <div>
      {/* <Navbar /> */}
      <EmpInfoContextProvider>
        <LocationContextProvider>
          <CarContextProvider>
            <SignUpContextProvider>
              <PoolContextProvider>
                <RiderContextProvider>
                  <App />
                </RiderContextProvider>
              </PoolContextProvider>
            </SignUpContextProvider>
          </CarContextProvider>
        </LocationContextProvider>
      </EmpInfoContextProvider>
      {/* <Footer /> */}
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
