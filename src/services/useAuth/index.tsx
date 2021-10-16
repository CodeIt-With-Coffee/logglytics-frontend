import { useEffect, useState } from "react";
import { httpGet, BASE_URL } from "../http";

function useAuth(token?: string) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCheckAPI = async () => {
    const response = await httpGet(`${BASE_URL}/auth`);
    setLoading(false);
    setAuth(response.status);
  };

  useEffect(() => {
    fetchCheckAPI();
  }, [token]);

  return {
    auth,
    loading,
  };
}

export default useAuth;
