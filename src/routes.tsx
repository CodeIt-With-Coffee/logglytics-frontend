import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Auth from "./auth";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={App} />
        <Route exact path={"/auth"} component={Auth} />
      </Switch>
    </Router>
  );
}

export default Routes;
