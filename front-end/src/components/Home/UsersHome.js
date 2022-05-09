import axios from "axios";
import { useState, useEffect } from "react";

import NavbarC from "../Navbar/Navbar";
import { Form, Button, Input, message } from "antd";
import "./userhome.css";
import Sendreq from "../sendrequest/Sendreq";

const UsersHome = () => {
  const [state, setState] = useState({
    books: [],
  });
  const { books } = state;
  const [commentState, setCommentState] = useState({
    comments: [],
  });
  const { comments } = commentState;
  const { TextArea } = Input;
  const getBooks = () => {
    axios
      .get("http://localhost:3002/api/getbooks")
      .then((response) => {
        setState({ books: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBooks();
  });

  return (
    <div className="userhome">
      <NavbarC />
      <div className="container " style={{ marginTop: "20px" }}>
        <div className="row g-2">
          <h1>Recently Added books</h1>
          {books.map((books, index) => (
            <div className="col-md-6 col-lg-6 col-sm-12 ">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title text-muted ">
                    BookName: {books.bname}
                  </h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    BookAuther: {books.bauthor}
                  </li>
                  <li className="list-group-item">
                    BookCategory: {books.bcategory}
                  </li>
                  <li className="list-group-item">
                    <button
                      className="btn btn-outline-info"
                      disabled
                      style={{ marginRight: "30px" }}
                    >
                      avialable
                    </button>

                    <div className="sendreq-btn">
                      <Sendreq />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <h1>Books you may like</h1>
        <div className="row"></div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-muted ">BookName: BookX</h3>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">BookAuther: Mr X</li>
              <li className="list-group-item">BookCategory: X</li>
              <li className="list-group-item">
                <button
                  className="btn btn-outline-danger"
                  style={{ marginRight: "30px" }}
                  disabled
                >
                  unavialable
                </button>
                <div className=" sendreq-btn" disabled>
                  <Sendreq />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-lg-6 col-md-4 col-sm-3">
            <Form.Item>
              <TextArea
                rows={4}
                value={comments}
                onChange={(e) => {
                  setCommentState({
                    ...commentState,
                    comments: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => {
                  setCommentState({ ...commentState, comments: "" });
                  message.info("comment sent successfully");
                }}
              >
                Add Comment
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersHome;
