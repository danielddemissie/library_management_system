import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../signUp/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [supSuccess, setSupSuccess] = useState({
    success: false,
    successMessage: "",
  });

  const [supErr, setSupErr] = useState({
    err: false,
    errMessage: "",
  });

  const { err, errMessage } = supErr;
  const { success, successMessage } = supSuccess;

  const [usernamereg, setUsernamReg] = useState("");
  const [paswordreg, setpasswordReg] = useState("");
  const [userIdReg, setUserIdReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [hasroleReg, sethasroleReg] = useState("");

  let history = useHistory();

  const SuccsesHandler = () => {
    return success ? (
      <div className="alert alert-success">
        {successMessage} Wellcome <strong>{usernamereg}</strong>
      </div>
    ) : (
      ""
    );
  };
  setTimeout(() => {
    if (err) {
      setSupErr({ ...supErr, err: false });
    }
  }, 2000);
  const ErrHandler = () => {
    return err ? <div className="alert alert-danger">{errMessage}</div> : "";
  };

  const signupHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/api/signup", {
        username: usernamereg,
        password: paswordreg,
        userid: userIdReg,

        email: emailReg,
        hasrole: hasroleReg,
      })
      .then((respose) => {
        if (respose.data === "sign up sucessfully!") {
          setSupSuccess({ success: true, successMessage: respose.data });
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
        if (respose.data === "please fill the form correctly") {
          setSupErr({ err: true, errMessage: respose.data });
        }
      });
  };
  return (
    <div className="container signup-container">
      <Link to="/">
        <button className="btn btn-outline-info">login</button>
      </Link>
      <div className="row justify-content-lg-center">
        <div className="col-md-6 col-lg-6 col-sm-6">
          <form className="signup-form">
            <h3 style={{ color: "#fff" }}>Sign up</h3>
            <div className="form-group">
              <label className="labels-login">User name </label>
              <input
                className="form-control"
                type="text"
                id="username"
                placeholder="username"
                onChange={(e) => {
                  setUsernamReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="labels-login">User id </label>
              <input
                className="form-control"
                type="text"
                id="userid"
                placeholder="userid"
                onChange={(e) => {
                  setUserIdReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="labels-login">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="email"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="labels-login">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => {
                  setpasswordReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="labels-login">User role </label>
              <input
                className="form-control"
                type="text"
                id="hasrole"
                placeholder="role"
                onChange={(e) => {
                  sethasroleReg(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="signupbtn" onClick={signupHandler}>
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div
        className="col-md-6 col-lg-6 col-sm-6"
        style={{ position: "absolute", top: "30px", right: "20px" }}
      >
        {ErrHandler()}
        {SuccsesHandler()}
      </div>
    </div>
  );
};

export default Signup;
