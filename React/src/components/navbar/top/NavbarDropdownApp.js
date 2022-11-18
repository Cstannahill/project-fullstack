import React from "react";
import PropTypes from "prop-types";
import { Nav, Row, Col } from "react-bootstrap";
import { getFlatRoutes } from "../../../helpers/utils";
import NavbarNavLink from "./NavbarNavLink";

const NavbarDropdownApp = ({ items }) => {
  return (
    <Row>
      <Nav className="flex-column">
        {items[0].children.map((route) => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
        {/* <NavbarNavLink label="Email" title="Email" />
          {routes.email.map((route) => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
          <NavbarNavLink label="Events" title="Events" />
          {routes.events.map((route) => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
          <NavbarNavLink label="Social" title="Social" />
          {routes.social.map((route) => (
            <NavbarNavLink key={route.name} route={route} />
          ))} */}
      </Nav>
    </Row>
  );
};

NavbarDropdownApp.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
      children: PropTypes.array,
    }).isRequired
  ).isRequired,
};

export default NavbarDropdownApp;
