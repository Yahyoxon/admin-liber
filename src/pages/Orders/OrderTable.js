/* eslint-disable array-callback-return */
import React from "react";

import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import { API_URL } from "../../configs/app.config";

const OrderTable = (props) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0NTQ0NzU0LCJpYXQiOjE2NjMyNDg3NTQsImp0aSI6ImJhNzhjYWUyOWJhODRmNTA5NmY0MzhlY2EwNjcwY2MyIiwidXNlcl9pZCI6NzN9.OKWQRjIt6j_Ua4WE7LvQEigoeOmFW7YDTlKFrtELGME"
  );
  myHeaders.append("Content-Type", "application/json");
  console.log(props);
  const raw = JSON.stringify({
    is_paid: true,
    is_complete: true,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  const handleChange = (guId) =>
    fetch(`${API_URL}api/v1/order/customer/${guId}/complete/`, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col xs={12}>
          <h5 className="mb-4 fw-bolder px-2 text-start">Буюртмалар</h5>
          <Card>
            <CardBody>
              <div className="table-rep-plugin text-center">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <Table
                    id="tech-companies-1 align-middle"
                    striped
                    bordered
                    responsive
                  >
                    <thead>
                      <tr>
                        <th>Кичик расм</th>
                        <th data-priority="1">Сарлавҳа</th>
                        <th data-priority="3">Умумий нарх</th>
                        <th data-priority="3">Миқдори</th>
                        <th data-priority="3">Китоб тури</th>
                        <th data-priority="3">Тўлов тури</th>
                        <th data-priority="3">Тўлиқ исми</th>
                        <th data-priority="3">Амаллар</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.results?.map((item, index) => {
                        if (!localStorage.getItem(item.guid)) {
                          return (
                            <tr key={item.guid}>
                              <td className="align-middle">
                                <img
                                  width={"60px"}
                                  alt={item?.book?.thumbnail?.substring(0, 10)}
                                  src={item?.book?.thumbnail}
                                />
                              </td>
                              <td className="align-middle">
                                {item?.book?.title}
                                {console.log(localStorage.getItem(item.guid))}
                              </td>
                              <td className="align-middle">
                                {item?.total_price}
                              </td>
                              <td className="align-middle">{item?.quantity}</td>
                              <td className="align-middle">
                                {item?.book_type?.book_type}
                              </td>
                              <td className="align-middle">
                                {item?.payment_type}
                              </td>
                              <td className="align-middle">
                                {item?.full_name}
                              </td>
                              <td className="align-middle">
                                <Button
                                  color="success"
                                  onClick={() => {
                                    handleChange(item.guid);
                                    window.localStorage.setItem(
                                      item.guid,
                                      item.guid
                                    );
                                    props.refetch();
                                  }}
                                >
                                  Тугатилди
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderTable;
