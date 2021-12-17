import React from "react";
import { Route } from "react-router-dom";

import Autorization from "./Autorization";
import Registartion from "./Registartion";

function StartScreen() {
  return (
    <div>
      <Route path="/" component={Autorization} exact />
      <Route path="/registration" component={Registartion} exact />
    </div>
  );
}

export default StartScreen;
