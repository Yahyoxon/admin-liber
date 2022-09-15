/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useBookCreate } from "../../services/mutation/use-create-book";
import { useCategoryUpdate } from "../../services/mutation/use-update-category";
import { Link, useHistory } from "react-router-dom";
import { useCategoryList } from "../../services/queries/use-category-list";
import { useBookDetails } from "../../services/queries/use-book-detail";
import useUpdateBook from "../../services/mutation/use-book-update";

const BookTable = (props) => {
  const fileRef = useRef();
  const fileRef1 = useRef();
  const [bookId, setBookId] = useState(0);
  const createBook = useBookCreate();
  const idRef = useRef(null);
  const bookDetail = useBookDetails();
  const bookUpdate = useUpdateBook(idRef.current);
  const detail = bookDetail?.data?.data;
  const [modal, setModal] = React.useState(false);
  const history = useHistory();
  const [editModal, setEditModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);
  const handleClose = () => setModal(false);
  const handleEditClose = () => setEditModal(false);
  const handleEditOpen = (guid) => {
    setBookId(guid);
    idRef.current = guid;
    editToggle();
    console.log(idRef.current);
    bookDetail.mutate({ bookId: guid });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const bookForm = new FormData();
    console.log("submitted", bookId);
    bookForm.append("title", `${e.target.title?.value}`);
    bookForm.append("author", `${e.target.author?.value}`);
    bookForm.append(
      "thumbnail",
      fileRef1.current?.files[0],
      `${fileRef1.current?.files[0]?.name}`
    );
    bookForm.append("category", `${e.target.select?.value}`);
    bookForm.append("language", `${e.target.language?.value}`);
    bookForm.append("hardcover", `${e.target.hardcover?.value}`);
    bookForm.append(
      "short_description_ru",
      `${e.target.short_description1_ru?.value}`
    );
    bookForm.append(
      "short_description_uz",
      `${e.target.short_description1_uz?.value}`
    );
    bookForm.append("published_date", `${e.target.published_date?.value}`);
    bookForm.append("book_types[0]book_type", "online");
    bookForm.append("book_types[0]price", `${e.target.bookprice_11?.value}`);
    bookForm.append("book_types[1]book_type", "paper");
    bookForm.append("book_types[1]price", `${e.target.bookprice_21?.value}`);
    bookForm.append("book_types[2]book_type", "audio");
    bookForm.append("book_types[2]price", `${e.target.bookprice_31?.value}`);
    bookForm.append("guid", `${e.target.bookprice_31?.value}`);
    bookUpdate.mutate(bookForm, {
      onSuccess: () => {
        handleEditClose();
        props.refetch();
      },
    });
  };
  const categoryList = useCategoryList();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookForm = new FormData();
    bookForm.append("title", `${e.target.title?.value}`);
    bookForm.append("author", `${e.target.author?.value}`);
    bookForm.append(
      "thumbnail",
      fileRef.current.files[0],
      `${fileRef.current.files[0].name}`
    );
    bookForm.append("category", `${e.target.select?.value}`);
    bookForm.append("language", `${e.target.language?.value}`);
    bookForm.append("hardcover", `${e.target.hardcover?.value}`);
    bookForm.append(
      "short_description_ru",
      `${e.target.short_description_ru?.value}`
    );
    bookForm.append(
      "short_description_uz",
      `${e.target.short_description_uz?.value}`
    );
    bookForm.append("published_date", `${e.target.published_date?.value}`);
    bookForm.append("types[0]types", "online");
    bookForm.append("types[0]price", `${e.target.bookprice_1?.value}`);
    bookForm.append("types[1]types", "paper");
    bookForm.append("types[1]price", `${e.target.bookprice_2?.value}`);
    bookForm.append("types[2]types", "audio");
    bookForm.append("types[2]price", `${e.target.bookprice_3?.value}`);
    createBook.mutate(bookForm, {
      onSuccess: () => {
        handleClose();
        props.refetch();
      },
    });
  };
  return (
    <React.Fragment>
      <h5 className="mb-4 fw-bolder px-2 text-start">Китоблар</h5>
      <Button color="success mb-3 mx-3" onClick={toggle}>
        Китоб қўшиш
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        modalTransition={{ timeout: 1000 }}
      >
        <ModalHeader title="Китоб қўшиш" className="text-center">
          Китоб қўшиш
        </ModalHeader>
        <ModalBody>
          <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label className="mt-2" htmlFor="title">
                Сарлавҳа
              </label>
              <input
                type="text"
                name="title"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label className="mt-2" htmlFor="author">
                Муаллиф
              </label>
              <input
                type="text"
                name="author"
                required
                className="form-control"
                id="author"
                placeholder="Муаллиф"
              />
              <label className="mt-2" htmlFor="thumbnail">
                Кичик расм
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                required
                className="form-control"
                id="thumbnail"
              />
              <label className="mt-2" htmlFor="select">
                Категория
              </label>
              <select
                required
                name="category_guid"
                className="form-control"
                id="select"
                placeholder="Категорияни танланг"
              >
                {categoryList?.results?.map((item, index) => (
                  <option key={item?.guid} value={`${item?.guid}`}>
                    {item?.title}
                  </option>
                ))}
              </select>
              <label className="mt-2" htmlFor="language">
                Тил
              </label>
              <input
                type="text"
                name="language"
                required
                className="form-control"
                id="language"
                placeholder="Тил"
              />
              <label className="mt-2" htmlFor="hardcover">
                Муқовали
              </label>
              <input
                type="number"
                min={1}
                name="hardcover"
                required
                className="form-control"
                id="hardcover"
                placeholder="Муқовали"
              />

              <label className="mt-2" htmlFor="short_description">
                Қисқа тавсифи (RU)
              </label>
              <input
                type="text"
                name="short_description"
                required
                className="form-control"
                id="short_description_ru"
                placeholder="Қисқа тавсифи"
              />
              <label className="mt-2" htmlFor="short_description">
                Қисқа тавсифи (UZ)
              </label>
              <input
                type="text"
                name="short_description"
                required
                className="form-control"
                id="short_description_uz"
                placeholder="Қисқа тавсифи"
              />
              <label className="mt-2" htmlFor="published_date">
                Нашр қилинган сана
              </label>
              <input
                type="date"
                name="published_date"
                required
                className="form-control"
                id="published_date"
              />
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_1" className="mt-3">
                    Электрон
                  </label>
                  <input
                    type="number"
                    min={1}
                    value="Электрон"
                    readOnly
                    name="booktype_1"
                    required
                    className="form-control"
                    id={`booktype_1`}
                    placeholder="Электрон"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_1`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id={`bookprice_1`}
                    name="bookprice_1"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_2" className="mt-3">
                    Қоғоз
                  </label>
                  <input
                    type="text"
                    min={1}
                    value="Қоғоз"
                    readOnly
                    name="booktype_2"
                    required
                    className="form-control"
                    id={`booktype_2`}
                    placeholder="Қоғоз"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_2`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    className="form-control"
                    id={`bookprice_2`}
                    name="bookprice_2"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_3" className="mt-3">
                    Аудио
                  </label>
                  <input
                    type="text"
                    value="Аудио"
                    readOnly
                    name="booktype_3"
                    required
                    className="form-control"
                    id={`booktype_3`}
                    placeholder="Аудио"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_3`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    className="form-control"
                    id={`bookprice_3`}
                    name="bookprice_3"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <Button
                className="mt-3"
                disabled={createBook?.isLoading}
                color="dark"
              >
                {createBook?.isLoading ? "Юкланмоқда..." : "Юбориш"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={editModal}
        toggle={editToggle}
        centered
        modalTransition={{ timeout: 1000 }}
      >
        <ModalHeader title="Китобни таҳрирлаш" className="text-center">
          Китобни таҳрирлаш
        </ModalHeader>
        <ModalBody>
          <form className="form-control" onSubmit={(e) => handleEditSubmit(e)}>
            <div className="form-group">
              <label className="mt-2" htmlFor="title">
                Сарлавҳа
              </label>
              <input
                defaultValue={detail?.title}
                type="text"
                name="title1"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label className="mt-2" htmlFor="author">
                Муаллиф
              </label>
              <input
                defaultValue={detail?.author}
                type="text"
                name="author1"
                required
                className="form-control"
                id="author"
                placeholder="Муаллиф"
              />
              <label className="mt-2" htmlFor="thumbnail">
                Кичик расм
              </label>
              <input
                defaultValue={detail?.thumbnail}
                ref={fileRef1}
                type="file"
                accept="image/*"
                className="form-control"
                id="thumbnail"
              />
              <label className="mt-2" htmlFor="select">
                Категория
              </label>
              <select
                required
                name="category_guid1"
                className="form-control"
                id="select"
                placeholder="Категорияни танланг"
              >
                {categoryList?.results?.map((item, index) => (
                  <option
                    key={item?.guid}
                    defaultValue={detail?.category?.guid}
                    value={`${item?.guid}`}
                  >
                    {item?.title}
                  </option>
                ))}
              </select>
              <label className="mt-2" htmlFor="language">
                Тил
              </label>
              <input
                type="text"
                defaultValue={detail?.language}
                name="language1"
                required
                className="form-control"
                id="language"
                placeholder="Тил"
              />
              <label className="mt-2" htmlFor="hardcover">
                Муқовали
              </label>
              <input
                defaultValue={detail?.hardcover}
                type="number"
                min={1}
                name="hardcover"
                required
                className="form-control"
                id="hardcover"
                placeholder="Муқовали"
              />

              <label className="mt-2" htmlFor="short_description_ru">
                Қисқа тавсифи(RU)
              </label>
              <input
                defaultValue={detail?.short_description_ru}
                type="text"
                name="short_description1_ru"
                required
                className="form-control"
                id="short_description"
                placeholder="Қисқа тавсифи"
              />
              <label className="mt-2" htmlFor="short_description_uz">
                Қисқа тавсифи(UZ)
              </label>
              <input
                defaultValue={detail?.short_description}
                type="text"
                name="short_description1_uz"
                required
                className="form-control"
                id="short_description"
                placeholder="Қисқа тавсифи"
              />
              <label className="mt-2" htmlFor="published_date">
                Нашр қилинган сана
              </label>
              <input
                defaultValue={detail?.published_date}
                type="date"
                name="published_date1"
                required
                className="form-control"
                id="published_date"
              />
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_1" className="mt-3">
                    Электрон
                  </label>
                  <input
                    type="number"
                    min={1}
                    value="Электрон"
                    readOnly
                    name="booktype_11"
                    required
                    className="form-control"
                    id={`booktype_1`}
                    placeholder="Электрон"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_1`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    defaultValue={detail?.types[2].price}
                    type="text"
                    required
                    className="form-control"
                    id={`bookprice_1`}
                    name="bookprice_11"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_2" className="mt-3">
                    Қоғоз
                  </label>
                  <input
                    type="text"
                    min={1}
                    value="Қоғоз"
                    readOnly
                    name="booktype_21"
                    required
                    className="form-control"
                    id={`booktype_2`}
                    placeholder="Қоғоз"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_2`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    defaultValue={detail?.types[1].price}
                    type="number"
                    min={1}
                    required
                    className="form-control"
                    id={`bookprice_2`}
                    name="bookprice_21"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <label htmlFor="booktype_3" className="mt-3">
                    Аудио
                  </label>
                  <input
                    type="text"
                    value="Аудио"
                    readOnly
                    name="booktype_31"
                    required
                    className="form-control"
                    id={`booktype_3`}
                    placeholder="Аудио"
                  />
                </div>
                <div>
                  <label htmlFor={`bookprice_3`} className="mt-3">
                    Нархи
                  </label>
                  <input
                    defaultValue={detail?.types[0].price}
                    type="number"
                    min={1}
                    required
                    className="form-control"
                    id={`bookprice_3`}
                    name="bookprice_31"
                    placeholder="Нархи"
                  />
                </div>
              </div>
              <div className="d-flex gap-3">
                <Button className="mt-3" type="submit" color="success">
                  {bookUpdate?.isLoading ? "Юкланмоқда..." : "Юбориш"}
                </Button>
                <Button
                  className="mt-3"
                  type="button"
                  onClick={handleEditClose}
                  color="dark"
                >
                  Бекор қилиш
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <Row className="p-0 m-0">
        <Col xs={12}>
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
                        <th data-priority="3">Муаллиф</th>
                        <th data-priority="3">Рейтинг</th>
                        <th data-priority="3">Амаллар</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.results.map((item, index) => {
                        return (
                          <tr key={item?.guid}>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              <img
                                width={"90px"}
                                alt={item?.thumbnail?.substring(0, 10)}
                                src={item?.thumbnail}
                              />
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle cursor-pointer text-body"
                            >
                              {item?.title}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              {item?.author}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              ★ {item?.rating}
                            </td>
                            <td style={{ display: "none" }}>
                              <input
                                type="text"
                                ref={idRef}
                                value={item?.guid}
                              />
                            </td>
                            <td className="align-middle">
                              <Button
                                onClick={() => handleEditOpen(item?.guid)}
                                color="warning"
                              >
                                Таҳрирлаш
                              </Button>
                            </td>
                          </tr>
                        );
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

export default BookTable;
