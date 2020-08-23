import axios from "axios";
import { get } from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
});
const rootStore = localStorage.getItem("persist:root");

if (rootStore) {
  const { signin } = JSON.parse(rootStore);
  const accessToken = get(JSON.parse(signin), "accessToken");

  if (accessToken) {
    instance.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

export default instance;
