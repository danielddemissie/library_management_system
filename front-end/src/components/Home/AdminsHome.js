import CommentComponent from "../comment/CommentComponent";
import NavbarC from "../Navbar/Navbar";
import { FaChartBar, FaChartLine } from "react-icons/fa";
import "./adminhome.css";

const AdminsHome = () => {
  return (
    <div className="adminhome">
      <NavbarC />
      <div className="container">
        <h1>Admins home </h1>
        <div className="row g-2">
          <div className="col-lg-4">
            <div className="crad">
              <div className="card-block">
                <div className="row">
                  <div className="col-8">
                    <h4 style={{ color: "green" }}>200</h4>
                    <h6>books number</h6>
                  </div>
                  <div className="col-4">
                    <FaChartBar style={{ color: "green", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div
                  className="row align-items-center"
                  style={{ background: "green" }}
                >
                  <div className="col-8">
                    <p style={{ color: "white", fontSize: "20px" }}>
                      frequently requested books
                    </p>
                  </div>
                  <div className="col-4">
                    <FaChartLine style={{ color: "#fff", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="crad">
              <div className="card-block">
                <div className="row">
                  <div className="col-8">
                    <h4 style={{ color: "green" }}>200</h4>
                    <h6>Magazine number</h6>
                  </div>
                  <div className="col-4">
                    <FaChartBar style={{ color: "green", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div
                  className="row align-items-center"
                  style={{ background: "#1890ff" }}
                >
                  <div className="col-8">
                    <p style={{ color: "white", fontSize: "20px" }}>
                      magazines requested books
                    </p>
                  </div>
                  <div className="col-4">
                    <FaChartLine style={{ color: "#fff", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="crad">
              <div className="card-block">
                <div className="row">
                  <div className="col-8">
                    <h4 style={{ color: "green" }}>200</h4>
                    <h6>desktops number</h6>
                  </div>
                  <div className="col-4">
                    <FaChartBar style={{ color: "green", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div
                  className="row align-items-center"
                  style={{ background: "#fd7e14" }}
                >
                  <div className="col-8">
                    <p style={{ color: "white", fontSize: "20px" }}>desktops</p>
                  </div>
                  <div className="col-4">
                    <FaChartLine style={{ color: "#fff", fontSize: "20px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 graphpic"></div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <h3>User comments</h3>
          <div className="col-lg-6">
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsHome;
