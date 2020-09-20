import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { SnackbarProvider } from "notistack";

import { AuthProvider } from "./Auth";

import Favicon from "react-favicon";

import icon from "./assets/favicon.ico";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
    <Favicon url={icon} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
