import axios from "axios";
import { get } from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT,
});

export const getAccessToken = () => {
  const rootStore = localStorage.getItem("persist:root");

  if (rootStore) {
    const { signin } = JSON.parse(rootStore);
    return get(JSON.parse(signin), "accessToken");
  }

  return null;
};

export default instance;
