import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Nav, Navbar, Row, Col } from "react-bootstrap";
import { navbarBreakPoint, topNavbarBreakpoint } from "../../../config";
import AppContext from "../../../context/Context";
import Flex from "../../common/Flex";
import Logo from "../../common/Logo";
import NavbarVerticalMenu from "./NavbarVerticalMenu";
import ToggleButton from "./ToggleButton";
import publicRoutes from "../../../routes/publicRoutes";
import secRoutes from "../../../routes/securedRoutes";
import { capitalize } from "../../../helpers/utils";
import NavbarTopDropDownMenus from "../top/NavbarTopDropDownMenus";
// import PurchaseCard from "./PurchaseCard";
import bgNavbar from "../../../assets/img/generic/bg-navbar.png";

const NavbarVertical = () => {
  const {
    config: {
      navbarPosition,
      navbarStyle,
      isNavbarVerticalCollapsed,
      showBurgerMenu,
    },
  } = useContext(AppContext);
  const routes = publicRoutes.concat(secRoutes);

  const HTMLClassList = document.getElementsByTagName("html")[0].classList;

  useEffect(() => {
    if (isNavbarVerticalCollapsed) {
      HTMLClassList.add("navbar-vertical-collapsed");
    } else {
      HTMLClassList.remove("navbar-vertical-collapsed");
    }
    return () => {
      HTMLClassList.remove("navbar-vertical-collapsed-hover");
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add("navbar-vertical-collapsed-hover");
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove("navbar-vertical-collapsed-hover");
  };
  // const routes = authProtectedFlattenRoutes.concat(
  //   publicProtectedFlattenRoutes
  // );

  // var routeLabels = [];
  // routes.forEach((e) => {
  //   if (!routeLabels.includes(e.label)) {
  //     routeLabels.push(e.label);
  //   }
  // });
  // console.log(routeLabels);

  // // eslint-disable-next-line array-callback-return
  // routeLabels = routeLabels.map((e) => {
  //   let routeObj = {};
  //   routeObj.label = e;
  //   routeObj.children = [];
  //   routes.forEach((r) => {
  //     if (routeObj.label === r.label) {
  //       routeObj.children.push(r);
  //     }
  //   });
  //   return routeObj;
  // });
  // console.log(routes, routeLabels);
  const NavbarLabel = ({ label }) => (
    <Nav.Item as="li" index={Math.random(1000)}>
      <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
        <Col xs="auto" className="navbar-vertical-label navbar-vertical-label">
          {label}
        </Col>
        <Col className="ps-0">
          <hr className="mb-0 navbar-vertical-divider"></hr>
        </Col>
      </Row>
    </Nav.Item>
  );
  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames("navbar-vertical", {
        [`navbar-${navbarStyle}`]: navbarStyle !== "transparent",
      })}
      variant="light"
    >
      <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={40} />
      </Flex>
      <Navbar.Collapse
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage:
            navbarStyle === "vibrant"
              ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbar})`
              : "none",
        }}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            {routes &&
              routes?.map((route) => (
                <Fragment key={route.label + Math.random(100)}>
                  {route.label !== "Error" && (
                    <NavbarLabel label={capitalize(route.label)} />
                  )}
                  <NavbarVerticalMenu routes={route?.children} />
                </Fragment>
              ))}
          </Nav>

          <>
            {navbarPosition === "combo" && (
              <div className={`d-${topNavbarBreakpoint}-none`}>
                <div className="navbar-vertical-divider">
                  <hr className="navbar-vertical-hr my-2" />
                </div>
                <Nav navbar>
                  <NavbarTopDropDownMenus />
                </Nav>
              </div>
            )}
          </>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarVertical.propTypes = {
  label: PropTypes.string,
};

export default NavbarVertical;
