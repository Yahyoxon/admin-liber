/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../configs/app.config";

export const useListRecommendation = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1ODQyMzM3LCJpYXQiOjE2NjQ1NDYzMzcsImp0aSI6IjE1MDYxNDBmNDdjZDQ2NzU5MDAxMmYwOWI5MzNlZjdlIiwidXNlcl9pZCI6Mjd9.rL-svw4fjDMQADxgQaJhGYVFhg2msZ00mXzCA8z6UEc"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchProjects = () =>
    fetch(`${API_URL}api/v1/book/recommendation/list/`, requestOptions).then(
      (res) => res.json()
    );

  const { data, refetch } = useQuery(
    ["recommendation"],
    () => fetchProjects(page),
    { keepPreviousData: true }
  );

  return { data, refetch };
};
