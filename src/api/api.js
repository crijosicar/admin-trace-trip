import axios from "axios";
import { get } from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT,
});

export const getAccessToken = async () => {
  return new Promise((resolve) => {
    const rootStore = localStorage.getItem("persist:root");

    if (rootStore) {
      const { signin } = JSON.parse(rootStore);

      return resolve(get(JSON.parse(signin), "accessToken"));
    }

    return resolve(null);
  });
};

export default instance;
