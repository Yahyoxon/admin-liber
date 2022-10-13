import axios from "axios";
import { API_URL } from "../configs/app.config";

export const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

  return config;
});

export const superRequest = axios.create({ baseURL: API_URL });

superRequest.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

  return config;
});
