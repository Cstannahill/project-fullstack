import React, { useContext } from "react";
import NavbarDropdown from "./NavbarDropdown";
import { homeRoutes, miscRoutes } from "../../../routes/publicRoutes";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { flatRoutes } from "../../../helpers/utils";
import NavbarDropdownApp from "./NavbarDropdownApp";
import NavbarDropdownPages from "./NavbarDropdownPages";
import NavbarDropdownModules from "./NavbarDropdownModules";
import AppContext from "../../../context/Context";
import {
  musicRoutes,
  schedRoutes,
  taskRoutes,
  socialRoutes,
} from "../../../routes/securedRoutes";

const NavbarTopDropDownMenus = () => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig,
  } = useContext(AppContext);

  const handleDropdownItemClick = () => {
    if (navbarCollapsed) {
      setConfig("navbarCollapsed", !navbarCollapsed);
    }
    if (showBurgerMenu) {
      setConfig("showBurgerMenu", !showBurgerMenu);
    }
  };

  return (
    <>
      <NavbarDropdown title="Home">
        {homeRoutes.children[0].children.map((route) => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? "link-600" : "text-500"}
            to={route.path}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>

      <NavbarDropdown title="Tasks">
        <NavbarDropdownApp items={taskRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="Music">
        <NavbarDropdownPages items={musicRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="Schedule">
        <NavbarDropdownModules items={schedRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="Social">
        {socialRoutes.children[0].children.map((route) => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? "link-600" : "text-500"}
            to={route.path}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>
      <NavbarDropdown title="Misc">
        {miscRoutes.children[0].children.map((route) => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? "link-600" : "text-500"}
            to={route.path}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>
    </>
  );
};

export default NavbarTopDropDownMenus;
