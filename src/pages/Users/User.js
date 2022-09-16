import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useQuery } from "react-query";
import { API_URL } from "../../configs/app.config";
import { Link } from "react-router-dom";

const UserLists = () => {
  const [page, setPage] = useState(1);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0NTQ0NzU0LCJpYXQiOjE2NjMyNDg3NTQsImp0aSI6ImJhNzhjYWUyOWJhODRmNTA5NmY0MzhlY2EwNjcwY2MyIiwidXNlcl9pZCI6NzN9.OKWQRjIt6j_Ua4WE7LvQEigoeOmFW7YDTlKFrtELGME"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchProjects = (page = 1) =>
    fetch(`${API_URL}api/v1/account/list/?page=` + page, requestOptions).then(
      (res) => res.json()
    );

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true }
  );

  return (
    <React.Fragment>
      <Row className="m-0 p-0">
        {isLoading ? (
          <div className="text-center my-3">Юкланмоқда...</div>
        ) : isError ? (
          <div className="text-center my-3">Хатолик: {error?.message}</div>
        ) : (
          <div className="text-center my-3">
            <Row className="bg-white text-dark p-3 mb-3 rounded border border-dark">
              <Col md={3} className="text-center">
                Профиль фотосурати
              </Col>
              <Col md={3} className="text-center">
                Исми
              </Col>
              <Col md={3} className="text-center">
                Фамилияси
              </Col>
              <Col md={3} className="text-center">
                Телефон рақами
              </Col>
            </Row>
            {data.results.map((item, index) => (
              <Link key={item.guid} to={`user/:${item.guid}`}>
                <Row className="bg-white text-dark p-3 mb-4">
                  <Col md={3}>
                    <img
                      width={25}
                      alt={item.profile_picture?.substring(0, 10)}
                      src={item.profile_picture}
                    />
                  </Col>
                  <Col md={3}>{item.first_name}</Col>
                  <Col md={3}>{item.last_name}</Col>
                  <Col md={3}>{item.phone_number}</Col>
                </Row>
              </Link>
            ))}
          </div>
        )}
      </Row>
      <div className="d-flex gap-4 mb-4">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          color="warning"
        >
          Олдинги саҳифа
        </Button>{" "}
        <Button
          color="success"
          onClick={() => {
            if (!isPreviousData && data.next) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.next}
        >
          Кейинги саҳифа
        </Button>
      </div>
    </React.Fragment>
  );
};

export default UserLists;
