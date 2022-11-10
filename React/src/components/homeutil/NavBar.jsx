import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../css/navbar.css";
import toastr from "toastr";
import userService from "../../services/userService";
import { UserContext } from "../../context/appContext";
const NavBar = ({ changeUser }) => {
  const onLogoutSuccess = () => {
    toastr.success("You have Logged Out");
    const user = {
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      isLoggedIn: false,
    };
    changeUser(user);
  };
  const currentUser = useContext(UserContext);
  const onLogoutErr = (err) => {
    console.log(err);
    toastr.error("Something went wrong. You were not logged out.");
  };
  const onLogout = () => {
    userService.logout().then(onLogoutSuccess).catch(onLogoutErr);
  };
  return (
    <Navbar
      className="site-nav px-0 mx-0"
      bg="dark"
      collapseOnSelect
      expand="lg"
      sticky="top"
      variant="dark"
    >
      <Container className="px-0">
        <Navbar.Brand className="site-nav-text" href="/">
          CollabFirst
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="site-nav-text">
          <Nav className="me-auto">
            <Nav.Link href="/cardview" className="site-nav-text">
              Card Game
            </Nav.Link>
            <NavDropdown
              title="Appointments"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/appointments">
                View Appointments
              </NavDropdown.Item>
              <NavDropdown.Item href="/appointmentform">
                Add Appointments
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Applications"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/appform">
                Add Application
              </NavDropdown.Item>
              <NavDropdown.Item href="/appview">
                View Applications
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            {currentUser?.avatarUrl && (
              <img
                className="nav-av mx-2"
                src={currentUser?.avatarUrl}
                alt="person"
              ></img>
            )}
            {currentUser?.isLoggedIn ? (
              <Nav.Link href="" className="site-nav-text">
                {currentUser.firstName}
              </Nav.Link>
            ) : (
              <Nav.Link href="/registration" className="site-nav-text">
                Register
              </Nav.Link>
            )}
            {currentUser?.isLoggedIn ? (
              <Nav.Link onClick={onLogout} className="site-nav-text">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="/login" className="site-nav-text">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
