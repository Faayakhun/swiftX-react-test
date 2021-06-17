import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

render(
  <Router basename="/otcsemails/">
    <App />
  </Router>,
  document.getElementById("root")
);
