import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "remixicon/fonts/remixicon.css";
import "font-awesome/css/font-awesome.min.css";
import Main from "./Main";
import "./helpers/initFA";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Main>
      <App />
    </Main>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
