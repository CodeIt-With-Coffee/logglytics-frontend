import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import SawoLogin from "sawo-react";
import Cookies from "js-cookie";

function Auth() {
  const history = useHistory();
  const onSuccess = (payload: any) => {
    Cookies.set("payload", JSON.stringify(payload));
    history.push("/");
  };

  const config = {
    onSuccess,
    identifierType: "email",
    apiKey: process.env.REACT_APP_SAWO_API,
    containerHeight: "500px",
    containerWidth: "100%",
  };

  if (JSON.parse(Cookies.get("payload") ?? "{}")?.user_id) {
    return <Redirect to={"/"} />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SawoLogin config={config} />
    </div>
  );
}

export default Auth;
