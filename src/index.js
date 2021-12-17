import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getStore } from "./redux/store";
// import store from "./redux/redusers/user";

import "semantic-ui-css/semantic.min.css";
import "./style/style.css";

const store = getStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
