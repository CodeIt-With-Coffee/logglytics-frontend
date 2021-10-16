import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Details from "./projectDetails";
import Auth from "./auth";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/project/:projectId"} component={Details} />
        <Route exact path={"/"} component={Dashboard} />
        <Route exact path={"/auth"} component={Auth} />
      </Switch>
    </Router>
  );
}

export default Routes;
