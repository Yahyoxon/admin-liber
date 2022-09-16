import axios from "axios";
import { API_URL } from "../configs/app.config";

export const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0NTQ0NzU0LCJpYXQiOjE2NjMyNDg3NTQsImp0aSI6ImJhNzhjYWUyOWJhODRmNTA5NmY0MzhlY2EwNjcwY2MyIiwidXNlcl9pZCI6NzN9.OKWQRjIt6j_Ua4WE7LvQEigoeOmFW7YDTlKFrtELGME`;
  return config;
});

export const superRequest = axios.create({ baseURL: API_URL });

superRequest.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0NTQ0NzU0LCJpYXQiOjE2NjMyNDg3NTQsImp0aSI6ImJhNzhjYWUyOWJhODRmNTA5NmY0MzhlY2EwNjcwY2MyIiwidXNlcl9pZCI6NzN9.OKWQRjIt6j_Ua4WE7LvQEigoeOmFW7YDTlKFrtELGME`;
  return config;
});
