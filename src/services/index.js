import axios from "axios";
import { API_URL } from "../configs/app.config";

export const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzMzA2ODQ0LCJpYXQiOjE2NjMyMjA0NDQsImp0aSI6IjU5YWUzZThiMjAyMzQxY2I5OTY3NmUzNzk4MzliMWQ2IiwidXNlcl9pZCI6NzN9.h58jdnFPSQ_2pijzUfqbFsjlbhUlOU1ySzb-8MtjGUU`;
  return config;
});

export const superRequest = axios.create({ baseURL: API_URL });

superRequest.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzMzA2ODQ0LCJpYXQiOjE2NjMyMjA0NDQsImp0aSI6IjU5YWUzZThiMjAyMzQxY2I5OTY3NmUzNzk4MzliMWQ2IiwidXNlcl9pZCI6NzN9.h58jdnFPSQ_2pijzUfqbFsjlbhUlOU1ySzb-8MtjGUU`;
  return config;
});
