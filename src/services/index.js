import axios from "axios";
import { API_URL } from "../configs/app.config";

export const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1ODQyMzM3LCJpYXQiOjE2NjQ1NDYzMzcsImp0aSI6IjE1MDYxNDBmNDdjZDQ2NzU5MDAxMmYwOWI5MzNlZjdlIiwidXNlcl9pZCI6Mjd9.rL-svw4fjDMQADxgQaJhGYVFhg2msZ00mXzCA8z6UEc";
  return config;
});

export const superRequest = axios.create({ baseURL: API_URL });

superRequest.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1ODQyMzM3LCJpYXQiOjE2NjQ1NDYzMzcsImp0aSI6IjE1MDYxNDBmNDdjZDQ2NzU5MDAxMmYwOWI5MzNlZjdlIiwidXNlcl9pZCI6Mjd9.rL-svw4fjDMQADxgQaJhGYVFhg2msZ00mXzCA8z6UEc";
  return config;
});
