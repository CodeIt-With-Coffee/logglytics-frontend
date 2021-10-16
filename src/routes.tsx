import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth";
import useAuth from "./services/useAuth";
import useCookie from "react-use-cookie";
import AuthContext from "./services/useAuth/context";

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
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/auth"} component={Auth} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
