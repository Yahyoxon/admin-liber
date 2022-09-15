import { useQuery } from "react-query";
import { Col, Row } from "reactstrap";
import { API_URL } from "../../configs/app.config";
import StyledTable from "../Tables/Table";
import TransactionTable from "../Tables/TransactionTable";

export const useLocation = () => {
  return window.location.pathname.split(":")[1];
};
const UserCridentionals = () => {
  const location = useLocation();
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzMzA2ODQ0LCJpYXQiOjE2NjMyMjA0NDQsImp0aSI6IjU5YWUzZThiMjAyMzQxY2I5OTY3NmUzNzk4MzliMWQ2IiwidXNlcl9pZCI6NzN9.h58jdnFPSQ_2pijzUfqbFsjlbhUlOU1ySzb-8MtjGUU"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const fetchUser = () =>
    fetch(`${API_URL}api/v1/account/${location}/detail/`, requestOptions).then(
      (res) => res.json()
    );
  const { isLoading, isError, error, data } = useQuery(
    ["projects"],
    () => fetchUser(),
    { keepPreviousData: true }
  );
  return (
    <Row className="m-0 p-0">
      <h3 className="mb-4 fw-bolder px-4 text-start">
        Фойдаланувчи тафсилотлари
      </h3>

      {isLoading ? (
        <div className="text-center my-3">Юкланмоқда...</div>
      ) : isError ? (
        <div className="text-center my-3">Хатолик: {error?.message}</div>
      ) : (
        <>
          <Row className=" m-0">
            <Col md={4}>
              Тўлиқ исми: {data.first_name} {data.last_name}
            </Col>
            <Col md={4}>
              Баланс:{" "}
              <span className="h6 bg-success text-white p-1 rounded">
                {" "}
                {data.balance}{" "}
              </span>
            </Col>
          </Row>
          <div className="text-center my-3">
            <StyledTable data={data} />
            <TransactionTable data={data} />
          </div>
        </>
      )}
    </Row>
  );
};

export default UserCridentionals;
