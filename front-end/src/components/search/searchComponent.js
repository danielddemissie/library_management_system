import { useState } from "react";
import "antd/dist/antd.css";
import { Input, AutoComplete } from "antd";
import axios from "axios";

const SearchComponent = () => {
  //TODO: make database search

  const [bookState, setBookState] = useState({
    bname: "",
    bauther: "",
    bcategory: "",
  });
  const { bname, bauther, bcategory } = bookState;

  let val = "";

  const searchB = () => {
    axios
      .get("http://localhost:3002/api/getbooks")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (val === response.data[i].bname) {
            setBookState({
              ...bookState,
              bname: response.data[i].bname,
              bauther: response.data[i].bauther,
              bcategory: response.data[i].bcategory,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <AutoComplete
        style={{
          width: 300,
        }}
      >
        <Input.Search
          size="large"
          placeholder="search books here "
          enterButton
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchB();
            }
          }}
          onChange={(e) => {
            val = e.target.value;
          }}
        />
      </AutoComplete>
      {bname ? (
        <div className="row">
          <div className="col-lg-6 col-md-4 col-sm-3">
            <div className="card">
              <div className="card-title">
                <h6>{bname}</h6>
                <p>{bauther}</p>
                <p>{bcategory}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchComponent;
