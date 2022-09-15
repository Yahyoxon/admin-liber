/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../configs/app.config";

export const useListRecommendation = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzMzA2ODQ0LCJpYXQiOjE2NjMyMjA0NDQsImp0aSI6IjU5YWUzZThiMjAyMzQxY2I5OTY3NmUzNzk4MzliMWQ2IiwidXNlcl9pZCI6NzN9.h58jdnFPSQ_2pijzUfqbFsjlbhUlOU1ySzb-8MtjGUU"
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
