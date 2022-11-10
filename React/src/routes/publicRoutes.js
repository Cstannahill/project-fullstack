import { lazy } from "react";
const Home = lazy(() => import("../components/homeutil/Home"));
const Login = lazy(() => import("../components/login/Login"));
const Registration = lazy(() => import("../components/register/Registration"));

const routes = [
  {
    path: "/",
    name: "Home",
    exact: true,
    element: Home,
    roles: [],
    isAnonymous: true,
    isSimple: true,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: Login,
    roles: [],
    isAnonymous: true,
    isSimple: true,
  },
  {
    path: "/registration",
    name: "Registration",
    exact: true,
    element: Registration,
    roles: [],
    isAnonymous: true,
    isSimple: true,
  },
];

const publicRoutes = [...routes];
export default publicRoutes;
