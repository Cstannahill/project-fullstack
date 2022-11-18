import { lazy } from "react";
import {
  socialRoutes,
  taskRoutes,
  musicRoutes,
  schedRoutes,
} from "./securedRoutes";
// const Home = lazy(() => import("../components/homeutil/Home"));
const Landing = lazy(() => import("../components/landing/Landing"));
// const Login = lazy(() => import("../components/login/Login"));
const Login = lazy(() => import("../components/authentication/card/Login"));
const Registration = lazy(() =>
  import("../components/authentication/card/Registration")
);
const AboutChristian = lazy(() => import("../components/about/AboutChristian"));
const Error404 = lazy(() => import("../components/error/Error404"));
const Friends = lazy(() => import("../components/prevwork/friends/Friends"));

export const homeRoutes = {
  label: "Home",
  labelDisable: false,
  children: [
    {
      name: "Home",
      active: true,
      icon: "home",
      children: [
        {
          path: "/",
          name: "Home",
          active: true,
          exact: true,
          element: Landing,
          roles: [],
          isAnonymous: true,
          isSimple: true,
        },
        {
          path: "/login",
          name: "Login",
          exact: true,
          active: true,
          element: Login,
          roles: [],
          isAnonymous: true,
          isSimple: true,
        },
        {
          path: "/register",
          name: "Registration",
          active: true,
          exact: true,
          element: Registration,
          roles: [],
          isAnonymous: true,
          isSimple: true,
        },
      ],
    },
  ],
};
export const miscRoutes = {
  label: "Misc",
  labelDisable: false,
  children: [
    {
      name: "Misc",
      active: true,
      icon: "question-circle",
      children: [
        {
          path: "/aboutchristian",
          name: "About",
          exact: true,
          active: true,
          element: AboutChristian,
          roles: [],
          isAnonymous: true,
          isSimple: true,
        },
        {
          path: "/people",
          name: "People",
          element: Friends,
          active: true,
          roles: [],
          isAnonymous: true,
          isSimple: true,
          exact: true,
        },
      ],
    },
  ],
};
export const errors = {
  label: "Error",
  labelDisable: true,
  children: [
    {
      name: "Error",
      active: false,
      icon: "chart-pie",
      children: [
        {
          path: "*",
          name: "Error - 404",
          element: Error404,
          roles: [],
          isAnonymous: true,
          isSimple: true,
        },
      ],
    },
  ],
};

export const allRoutes = [
  ...homeRoutes.children[0].children,
  ...musicRoutes.children[0].children,
  ...taskRoutes.children[0].children,
  ...socialRoutes.children[0].children,
  ...schedRoutes.children[0].children,
  ...miscRoutes.children[0].children,
  ...errors.children[0].children,
];
const publicRoutes = [homeRoutes, miscRoutes];
export default publicRoutes;
