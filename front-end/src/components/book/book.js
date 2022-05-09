import { useState } from "react";
import axios from "axios";
import "./book.css";
import { Modal, Button, message, Input } from "antd";

const Book = () => {
  //back end
  const [bid, setBid] = useState("");
  const [bname, setBname] = useState("");
  const [bcategory, setBcategory] = useState("");
  const [bauthor, setBauthor] = useState("");
  const [bquantity, setBquantity] = useState("");
  //end
  //to show or hide modal
  const [addBookModal, setAddBookModal] = useState({
    addBookModalV: false,
  });

  const { addBookModalV } = addBookModal;
  //function
  const setAddBookModalV = (addBookModalV) => {
    setAddBookModal({ addBookModalV });
  };
  //eend

  const bookHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/api/addbook", {
        bid: bid,
        bname: bname,
        bauthor: bauthor,
        bcategory: bcategory,
        bquantity: bquantity,
      })
      .then((respose) => {
        if (respose.data === "please insert valid data in the form correctly") {
          message.error("please inser all nessesry data");
        }
        if (respose.data === "added successfully") {
          message.success("added successfully");
          setAddBookModalV(false);
        }
      });
  };

  return (
    <div className="container addbookcontainer">
      <Button
        type="primary"
        onClick={() => setAddBookModalV(true)}
        style={{ marginTop: "5px" }}
      >
        Add material
      </Button>
      <div className="row">
        <Modal
          title="add material"
          centered
          visible={addBookModalV}
          onOk={() => setAddBookModalV(false)}
          onCancel={() => setAddBookModalV(false)}
        >
          <form className="book-form">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="book id"
                //backend
                onChange={(e) => {
                  setBid(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="book name"
                onChange={(e) => {
                  setBname(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="book author"
                onChange={(e) => {
                  setBauthor(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="book category"
                onChange={(e) => {
                  setBcategory(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                placeholder="book quantity"
                onChange={(e) => {
                  setBquantity(e.target.value);
                }}
              />
            </div>

            <button className="add-book-bnt" onClick={bookHandler}>
              Add
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Book;
