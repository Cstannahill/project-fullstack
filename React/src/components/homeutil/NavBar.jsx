import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../css/navbar.css";
import toastr from "toastr";
import userService from "../../services/userService";
import { UserContext } from "../../context/appContext";
import Avatar from "../common/Avatar";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
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
      <Container className="px-3" fluid>
        <Navbar.Brand className="site-nav-text" href="/">
          CollabFirst
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="site-nav-text">
          <Nav className="me-auto">
            <NavDropdown
              title="Games"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/cardview">Card Game</NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown
              title="Scheduling"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Divider />
              <NavDropdown.Item href="/appointments">
                View Appointments
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/appointmentform">
                Add Appointments
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/appview">
                View Applications
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/appform">
                Add Application
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown> */}
            <NavDropdown
              title="Music"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/music">Collection</NavDropdown.Item>
              <NavDropdown.Item href="/music/nowplaying">
                Now Playing
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Social"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="About Devs"
              id="collasible-nav-dropdown"
              className="site-nav-text"
            >
              <NavDropdown.Item href="/aboutchristian">
                Christian
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {currentUser?.avatarUrl &&
              location.pathname !== "/music/nowplaying" && (
                <Avatar
                  size="2xl"
                  rounded="3"
                  className="mx-2"
                  src={currentUser?.avatarUrl}
                ></Avatar>
              )}
            {currentUser?.isLoggedIn ? (
              <NavDropdown
                className="site-nav-text"
                id="collasible-nav-dropdown"
                title={currentUser.firstName}
              >
                <NavDropdown.Item href="/kanban">Kanban</NavDropdown.Item>
              </NavDropdown>
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
