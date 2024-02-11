import axios from "axios";
import { getCookie } from "react-use-cookie";

const BASE_URL = "https://logglytics-backend.onrender.com";

const headers = () => {
  const token = getCookie("token");
  return {
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };
};

const getRequest = async (
  url: string,
  params?: any
): Promise<{
  status: boolean;
  data?: any | null;
  error?: string;
}> => {
  try {
    const response = await axios({
      method: "GET",
      params,
      headers: headers(),
      url,
    });
    return response.data as any;
  } catch (e: any) {
    console.error(e);
    return {
      status: false,
    };
  }
};

const postRequest = async (
  url: string,
  data?: any
): Promise<{
  status: boolean;
  data?: any | null;
  error?: string;
}> => {
  try {
    const response = await axios({
      method: "POST",
      data,
      headers: headers(),
      url,
    });
    return response.data as any;
  } catch (e: any) {
    console.error(e);
    return {
      status: false,
    };
  }
};

const deleteRequest = async (
  url: string,
  data?: any
): Promise<{
  status: boolean;
  data?: any | null;
  error?: string;
}> => {
  try {
    const response = await axios({
      method: "DELETE",
      data,
      headers: headers(),
      url,
    });
    return response.data as any;
  } catch (e: any) {
    console.error(e);
    return {
      status: false,
    };
  }
};

export { getRequest, postRequest, deleteRequest, BASE_URL };
