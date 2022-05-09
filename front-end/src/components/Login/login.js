import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import "./login.css";
import { Input } from "antd";

const Login = () => {
  const [loginState, setloginState] = useState({
    err: false,
    message: "",
  });

  const { err, message } = loginState;

  const [loginUn, setloginUn] = useState("");
  const [loginPass, setloginPass] = useState("");

  let history = useHistory();
  setTimeout(() => {
    if (err) {
      setloginState({ ...loginState, err: false });
    }
  }, 2000);

  const Showerr = () => {
    return err ? (
      <div className="alert alert-danger" style={{ marginTop: "20px" }}>
        {message}
      </div>
    ) : (
      ""
    );
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/api/login", {
        username: loginUn,
        password: loginPass,
      })
      .then((respose) => {
        // console.log(respose.data[0].hasrole);
        if (
          loginUn === respose.data[0].username &&
          loginPass === respose.data[0].password
        ) {
          if (respose.data[0].hasrole === "user") {
            history.push("/UsersHome");
          }

          if (respose.data[0].hasrole === "admin") {
            history.push("/AdminsHome");
          }
          if (respose.data[0].hasrole === "librarian") {
            history.push("/LibrarianHome");
          }
        }
        if ((respose.data = "incorrect username or password")) {
          setloginState({ err: true, message: respose.data });
        }
      });
  };
  return (
    <div className="container login-container">
      <div className="row justify-content-lg-center">
        <di className="col-md-6 col-lg-6 col-sm-12">
          <Link to="/">
            <h1 className="lms-name">Library Management System</h1>
          </Link>
        </di>
        <div className="row justify-content-lg-center">
          <di className="col-md-6 col-lg-6 col-sm-12">
            <Link to="/signup">
              <button
                className="btn btn-outline-info signup-at-login"
                style={{ color: "white" }}
              >
                signup
              </button>
            </Link>
          </di>
        </div>
      </div>
      <div className="row justify-content-lg-center ">
        <div className="col-md-6 col-lg-4 col-sm-6">
          <form className="login-form">
            <h3 className="login-name">Login</h3>
            <div className="form-group">
              <label className="labels-login">User Name:</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="User Name"
                onChange={(e) => {
                  setloginUn(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="labels-login">Password:</label>

              <Input.Password
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => {
                  setloginPass(e.target.value);
                }}
              />
            </div>
            <div className="container loginbtn-fp-da">
              <div className="row">
                <div>
                  <div className="col ">
                    <button
                      type="submit"
                      className="loginbtn"
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col ">
                    <Link to="/signup" className="donthave-account">
                      don't have an account?
                    </Link>
                  </div>
                  <div className="col ">
                    <Link to="/underdev" className="forgot-password text-right">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {Showerr()}
        </div>
      </div>
    </div>
  );
};

export default Login;
