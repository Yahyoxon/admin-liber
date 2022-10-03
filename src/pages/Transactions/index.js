import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button, Col, Container, Row } from "reactstrap";
import { API_URL } from "../../configs/app.config";
import ResponsiveTables from "../Tables/ResponsiveTables";

const Transactions = () => {
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
  const fetchProjects = (page = 1) =>
    fetch(
      `${API_URL}api/v1/transaction/list/?page=` + page,
      requestOptions
    ).then((res) => res.json());

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true }
  );
  console.log(data);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Row>
                {isLoading ? (
                  <div className="text-center my-3">Юкланмоқда...</div>
                ) : isError ? (
                  <div className="text-center my-3">
                    Хатолик: {error?.message}
                  </div>
                ) : (
                  <div className="text-center">
                    <ResponsiveTables props={data.results} />
                  </div>
                )}
              </Row>
            </Col>
            <div className="d-flex gap-4 mb-4 mx-4">
              <Button
                color="warning"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Олдинги саҳифа
              </Button>
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transactions;
