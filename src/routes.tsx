import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useCookie from "react-use-cookie";
import AuthContext from "./services/useAuth/context";
import Dashboard from "./dashboard";
import ProjectDetails from "./projectDetails";
import Auth from "./auth";
import useAuth from "./services/useAuth";

function Routes() {
  const [token, setToken] = useCookie("token", "");
  const { auth, loading } = useAuth(token);

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <Router>
        <Switch>
          <Route
            exact
            path={"/project/:projectId"}
            component={ProjectDetails}
          />
          <Route exact path={"/"} component={Dashboard} />
          <Route exact path={"/auth"} component={Auth} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
