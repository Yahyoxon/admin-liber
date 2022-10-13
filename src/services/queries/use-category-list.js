/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../configs/app.config";

export const useCategoryList = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchProjects = () =>
    fetch(`${API_URL}api/v1/category/list/`, requestOptions).then((res) =>
      res.json()
    );

  const { data } = useQuery(["projects", page], () => fetchProjects(page), {
    keepPreviousData: true,
  });

  return data;
};
