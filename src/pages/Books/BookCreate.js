import React, { useRef, useState } from "react";
import Default from "../../assets/images/default.png";
import { Button, Col, Container, Row } from "reactstrap";
import { useBookCreate } from "../../services/mutation/use-create-book";
import { useCategoryList } from "../../services/queries/use-category-list";
import { useHistory } from "react-router-dom";

const BookCreate = () => {
  const fileRef = useRef();
  const history = useHistory();
  const [file, setFile] = useState();
  const categoryList = useCategoryList();
  const createBook = useBookCreate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookForm = new FormData();
    bookForm.append("title", `${e.target.title?.value}`);
    bookForm.append("author", `${e.target.author?.value}`);
    bookForm.append("thumbnail", file, `${file?.name}`);
    bookForm.append("category", `${e.target.category_guid?.value}`);
    bookForm.append("language", `${e.target.language?.value}`);
    bookForm.append("hardcover", `${e.target.hardcover?.value}`);
    bookForm.append("page_count", `${e.target.page_count?.value}`);
    bookForm.append("publisher", `${e.target.publisher?.value}`);
    bookForm.append("isbn", `${e.target.isbn?.value}`);
    bookForm.append(
      "short_description_ru",
      `${e.target.short_description_ru?.value}`
    );
    bookForm.append(
      "short_description_uz",
      `${e.target.short_description_uz?.value}`
    );
    bookForm.append("published_date", `${e.target.published_date?.value}`);
    bookForm.append("types[0]book_type", "online");
    bookForm.append("types[0]price", `${e.target.bookprice_1?.value}`);
    bookForm.append("types[1]book_type", "paper");
    bookForm.append("types[1]price", `${e.target.bookprice_2?.value}`);
    bookForm.append("types[2]book_type", "audio");
    bookForm.append("types[2]price", `${e.target.bookprice_3?.value}`);
    createBook.mutate(bookForm, {
      onSuccess: () => {
        history.push("/books");
      },
    });
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h3>?????????? ??????????</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <Row xs="2">
                <Col>
                  <label className="mt-2" htmlFor="title">
                    ????????????????
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="form-control"
                    id="title"
                    placeholder="????????????????"
                  />
                  <label className="mt-2" htmlFor="author">
                    ??????????????
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    className="form-control"
                    id="author"
                    placeholder="??????????????"
                  />
                  <label className="mt-2" htmlFor="category_guid">
                    ??????????????????
                  </label>
                  <select
                    required
                    name="category_guid"
                    className="form-control"
                    id="category_guid"
                    placeholder="?????????????????????? ??????????????"
                  >
                    {categoryList?.results?.map((item, index) => (
                      <option key={item?.guid} value={`${item?.guid}`}>
                        {item?.title}
                      </option>
                    ))}
                  </select>
                  <label className="mt-2" htmlFor="language">
                    ??????
                  </label>
                  <input
                    type="text"
                    name="language"
                    required
                    className="form-control"
                    id="language"
                    placeholder="??????"
                  />
                  <label className="mt-2" htmlFor="page_count">
                    ?????????????????? ????????
                  </label>
                  <input
                    type="number"
                    name="page_count"
                    required
                    className="form-control"
                    id="page_count"
                    placeholder="?????? ????????????????"
                  />
                  <label className="mt-2" htmlFor="hardcover">
                    ????????????????
                  </label>
                  <select
                    required
                    name="hardcover"
                    className="form-control"
                    id="hardcover"
                    placeholder="??????????????"
                  >
                    <option value="????????????">
                      ????????????
                    </option>
                    <option value="??????????">
                      ??????????
                    </option>
                  </select>
                  <label htmlFor="publisher" className="mt-2">
                    ??????????????
                  </label>
                  <input
                    className="form-control"
                    id="publisher"
                    name="publisher"
                    placeholder="?????????? ????????"
                  />
                  <label className="mt-2" htmlFor="published_date">
                    ???????? ???????????????? ????????
                  </label>
                  <input
                    type="number"
                    min="1800"
                    max="2050"
                    name="published_date"
                    required
                    className="form-control"
                    id="published_date"
                  />
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_1" className="mt-3">
                        ????????????????
                      </label>
                      <input
                        type="number"
                        value="????????????????"
                        readOnly
                        name="booktype_1"
                        required
                        className="form-control"
                        id={`booktype_1`}
                        placeholder="????????????????"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_1`} className="mt-3">
                        ??????????
                      </label>
                      <input
                        defaultValue={0}
                        type="text"
                        required
                        className="form-control"
                        id={`bookprice_1`}
                        name="bookprice_1"
                        placeholder="??????????"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_2" className="mt-3">
                        ??????????
                      </label>
                      <input
                        type="text"
                        value="??????????"
                        readOnly
                        name="booktype_2"
                        required
                        className="form-control"
                        id={`booktype_2`}
                        placeholder="??????????"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_2`} className="mt-3">
                        ??????????
                      </label>
                      <input
                        defaultValue={0}
                        type="number"
                        required
                        className="form-control"
                        id={`bookprice_2`}
                        name="bookprice_2"
                        placeholder="??????????"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_3" className="mt-3">
                        ??????????
                      </label>
                      <input
                        type="text"
                        value="??????????"
                        readOnly
                        name="booktype_3"
                        required
                        className="form-control"
                        id={`booktype_3`}
                        placeholder="??????????"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_3`} className="mt-3">
                        ??????????
                      </label>
                      <input
                        defaultValue={0}
                        type="number"
                        required
                        className="form-control"
                        id={`bookprice_3`}
                        name="bookprice_3"
                        placeholder="??????????"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <label htmlFor="isbn" className="mt-3">
                      ISBN
                    </label>
                    <input
                      className="form-control"
                      id="isbn"
                      name="isbn"
                      placeholder="9789943646223"
                    />
                  </div>

                  <label className="mt-2" htmlFor="short_description">
                    ?????????? ?????????????? (RU)
                  </label>
                  <textarea
                    type="text"
                    name="short_description"
                    required
                    rows="4"
                    className="form-control"
                    id="short_description_ru"
                    placeholder="?????????? ??????????????"
                  />
                  <label className="mt-2" htmlFor="short_description">
                    ?????????? ?????????????? (UZ)
                  </label>
                  <textarea
                    type="text"
                    name="short_description"
                    required
                    rows="4"
                    className="form-control"
                    id="short_description_uz"
                    placeholder="?????????? ??????????????"
                  />
                  <label className="mt-2" htmlFor="thumbnail">
                    ?????????? ????????
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    required
                    className="form-control"
                    id="thumbnail"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <img
                    src={file ? URL.createObjectURL(file) : Default}
                    className="mt-3"
                    width="250px"
                    height="300px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    alt=""
                  />
                </Col>
              </Row>
              <Button
                disabled={createBook?.isLoading}
                color="dark"
                className="mb-5 mt-4"
              >
                {createBook?.isLoading ? "????????????????????..." : "??????????"}
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BookCreate;
