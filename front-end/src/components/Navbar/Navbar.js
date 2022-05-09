import "../Navbar/Navbar.css";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import SearchComponent from "../search/searchComponent";
import SubscribeComponent from "../suscribe/SubscribeComponent";

const NavbarC = ({ subsribeV }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [num, setNum] = useState(3);
  const notifHandler = () => {
    setNum(0);
  };

  return (
    <div className="Navbar-strap">
      <Navbar color="light" light expand="md">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            marginLeft: "20px",
          }}
        >
          <NavbarBrand className="text-muted ">
            Library Management System
          </NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto " navbar>
            <NavItem style={{ marginBottom: "10px" }}>
              <NavbarText>
                <SubscribeComponent />
              </NavbarText>
            </NavItem>
            <NavItem>
              <NavbarText>
                <SearchComponent />
              </NavbarText>
            </NavItem>
            <NavItem>
              <Link to="/" style={{ textDecoration: "none", fontSize: "15px" }}>
                <NavbarText className="logout-at-navbar">Logout </NavbarText>
              </Link>
            </NavItem>

            <NavItem className="nofi-at-navbar">
              <div className="notification">
                <Link to="/Notification">
                  <i className="notif-icon" onClick={notifHandler}>
                    <FaBell />
                  </i>
                  <span className="notif-num">{num}</span>
                </Link>
              </div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarC;
