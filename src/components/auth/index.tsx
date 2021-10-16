import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import SawoLogin from "sawo-react";
import AuthContext from "../../services/useAuth/context";
import { BASE_URL, httpPost } from "../../services/http";

function Auth() {
  const { auth, login } = useContext(AuthContext);
  const onSuccess = async (payload: any) => {
    const response = await httpPost(`${BASE_URL}/auth`, {
      userId: payload.user_id,
      emailId: payload.identifier,
    });
    if (response.status && response.data) {
      login(response.data);
    }
  };

  const config = {
    onSuccess,
    identifierType: "email",
    apiKey: process.env.REACT_APP_SAWO_API,
    containerHeight: "500px",
    containerWidth: "100%",
  };

  if (auth) {
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
