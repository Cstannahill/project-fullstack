import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import Avatar from "../../common/Avatar";
import userService from "../../../services/userService";
import { UserContext } from "../../../context/appContext";
import toastr from "toastr";
import { homeRoutes } from "../../../routes/publicRoutes";

const ProfileDropdown = () => {
  const currentUser = useContext(UserContext);
  const onLogoutSuccess = () => {
    toastr.success("You have Logged Out");
    const user = {
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      isLoggedIn: false,
    };
    currentUser.changeUser(user);
  };

  const onLogoutErr = (err) => {
    console.log(err);
    toastr.error("Something went wrong. You were not logged out.");
  };
  const onLogoutClicked = () => {
    userService.logout().then(onLogoutSuccess).catch(onLogoutErr);
  };
  const idx = homeRoutes.children[0].children.findIndex(
    (e) => e.name === "Login"
  );
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar
          src={currentUser?.avatarUrl}
          size="xl"
          className="align-middle mx-auto"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item className="fw-bold text-warning" href="#!">
            <FontAwesomeIcon icon="crown" className="me-1" />
            <span>Go Pro</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#!">Set status</Dropdown.Item>
          <Dropdown.Item as={Link} to="/user/profile">
            Profile &amp; account
          </Dropdown.Item>
          <Dropdown.Item href="#!">Feedback</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/user/settings">
            Settings
          </Dropdown.Item>
          {currentUser.isLoggedIn ? (
            <Dropdown.Item as={Link} onClick={onLogoutClicked}>
              Logout
            </Dropdown.Item>
          ) : (
            <Dropdown.Item as={Link} to="/login">
              Login
            </Dropdown.Item>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
