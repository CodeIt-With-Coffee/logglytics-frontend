import { useEffect, useState } from "react";
import { getRequest, BASE_URL } from "../http";

function useAuth(token?: string) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheckAPI();
  }, [token]);

  const fetchCheckAPI = async () => {
    const response = await getRequest(`${BASE_URL}/auth`);
    setAuth(response.status);
    setLoading(false);
  };

  return {
    auth,
    loading,
  };
}

export default useAuth;
