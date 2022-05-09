import { Component } from "react";
import Book from "../book/book";
import NavbarC from "../Navbar/Navbar";
import "./librarianhome.css";
import axios from "axios";

class LibrarianHome extends Component {
  state = {
    books: [],
    id: "",
  };

  getBooks() {
    axios
      .get("http://localhost:3002/api/getbooks")
      .then((response) => {
        this.setState({ books: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getBooks();
  }
  componentDidUpdate() {
    this.getBooks();
  }
  render() {
    return (
      <div className="libarianhome">
        <NavbarC />
        <div className="container">
          <h1>librarian home</h1>
          <Book />
        </div>

        <div className="container ">
          <div className="row g-2">
            <h1>Added books</h1>
            {this.state.books.map((books, index) => (
              <div className="col-md-6 col-lg-6 col-sm-12 ">
                <div className="card text-muted">
                  <div className="card-header">
                    <h3 className="card-title">BookName: {books.bname}</h3>
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
                        update
                      </button>

                      <button className="btn btn-primary remove-btn">
                        remove
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default LibrarianHome;
