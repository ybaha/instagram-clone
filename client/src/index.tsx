import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Firebase/Router";
import AuthProvider from "./Firebase/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <Router />
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
