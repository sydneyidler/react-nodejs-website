import React from "react";
import { render } from "react-dom";
import "./scss/app.scss";
import App from "./components/App.js";

const rootEl = document.getElementById("app");

render(<App />, rootEl);
