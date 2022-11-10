import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/homeutil/NavBar";
import { Suspense } from "react";
import CardView from "./components/cards/CardView";
import LoweryHillView from "./components/loweryhill/LoweryHillView";
import Confirmation from "./components/register/Confirmation";
import { useState, useEffect, useCallback } from "react";
import userService from "./services/userService";
import {
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "../src/routes/index";
import { UserContext } from "./context/appContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    isLoggedIn: false,
    roles: ["Admin"],
  });

  const [currentPath, setCurrentPath] = useState({
    isPublic: false,
    isSecured: false,
    isUnknown: false,
    isSimple: false,
  });
  UserContext.displayName = "User";
  const { pathname } = useLocation();
  useEffect(() => {
    userService
      .getCurrent()
      .then(onGetCurrentSuccess)
      .catch(onCurrentUserError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeUser = (res) => {
    setCurrentUser((prevState) => {
      let newUser = { ...prevState };
      newUser.firstName = res.firstName;
      newUser.lastName = res.lastName;
      newUser.email = res.email;
      newUser.avatarUrl = res.avatarUrl;
      newUser.isLoggedIn = res.isLoggedIn;
      return newUser;
    });
  };

  const onGetCurrentSuccess = (res) => {
    console.log(res);
    const curUser = res;
    if (curUser.email) {
      curUser.isLoggedIn = true;
    }
    changeUser(curUser);
  };
  const onCurrentUserError = (err) => {
    console.log(err);
  };
  const loading = <div className="spinner-border mx-auto" />;
  const currentPathCheck = (pp) => {
    let ppPath = pp?.path?.split("/").filter((el) => el !== "");
    let pathNameCheck = pathname?.split("/").filter((el) => el !== "");
    let result = false;
    // console.log('ppPath: ', ppPath, 'pathNameCheck: ', pathNameCheck);
    if (ppPath.length === pathNameCheck?.length) {
      if (pathNameCheck?.length === 0) {
        result = true;
      } else {
        for (let a = 0; a < pathNameCheck?.length; a++) {
          if (pathNameCheck[a] !== ppPath[a]) {
            if (
              ppPath[a]?.startsWith(":") &&
              pathNameCheck[a]?.match(/^[0-9]+$/)
            ) {
              result = true;
            } else {
              return false;
            }
          } else {
            result = true;
          }
        }
      }
    }
    return result;
  };

  // ensure that currentPath.path is set to true, but only if it is false AND it should be true
  useEffect(() => {
    if (publicProtectedFlattenRoutes?.some((pp) => currentPathCheck(pp))) {
      // condition met
      if (!currentPath?.isPublic) {
        setCurrentPath(() => {
          const [currentRouteData] = publicProtectedFlattenRoutes?.filter(
            (pp) => currentPathCheck(pp)
          );
          let isSimple = currentRouteData?.isSimple
            ? currentRouteData?.isSimple
            : false;
          return { isSecured: false, isPublic: true, isSimple };
        });
      }
    } else if (authProtectedFlattenRoutes?.some((pp) => currentPathCheck(pp))) {
      if (!currentPath?.isSecured) {
        setCurrentPath(() => {
          return { isPublic: false, isSecured: true, isSimple: false };
        });
      }
    } else if (!currentPath?.isUnknown) {
      setCurrentPath(() => {
        return { isUnknown: true };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentPath]);

  const getRouteMapper = useCallback(
    (routeData) => (
      <Route
        key={routeData?.path}
        path={routeData?.path}
        exact={routeData?.exact}
        name={routeData?.name}
        isSimple={routeData?.isSimple}
        element={
          <routeData.element
            currentUser={currentUser}
            changeUser={changeUser}
          />
        }
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getMappedRoutes = useCallback(
    (arrOfRouteData, currentUser) => {
      let theseRoutes = arrOfRouteData?.map(getRouteMapper);
      // console.log('getMappedRoutes.', theseRoutes);
      return theseRoutes;
    },
    [getRouteMapper]
  );

  const generateDynamicRoutes = (currentUser) => {
    //console.log('generateDynamicRoutes', authProtectedFlattenRoutes);
    let routes = authProtectedFlattenRoutes?.filter((route) => {
      if (route?.roles?.length === 0) {
        return true; //all any loggedIn user to see routes that have empty roles
      }
      return route?.roles?.some((role) => currentUser?.roles?.includes(role));
    });
    //console.log('generateDynamicRoutes', routes);
    return getMappedRoutes(routes, currentUser);
  };

  const getLast = (arr) => {
    return [arr[arr.length - 1]];
  };
  return (
    <>
      <UserContext.Provider value={currentUser}>
        <NavBar
          className="site-nav"
          // currentUser={currentUser}
          changeUser={changeUser}
        ></NavBar>

        <div>
          <Suspense fallback={loading}>
            {/* if the path is public we do not care about the current User  */}
            <Routes>
              {currentPath.isPublic &&
                currentPath.isSimple &&
                getMappedRoutes(publicProtectedFlattenRoutes, currentUser)}
              {currentPath?.isPublic &&
                !currentPath?.isSimple &&
                getMappedRoutes(publicProtectedFlattenRoutes, currentUser)}

              {/* if the user is logged in and attempting to go to an KNOWN page, that is is also secure/not public  */}
              {currentUser.isLoggedIn &&
                !currentPath.isPublic &&
                !currentPath.isUnknown &&
                generateDynamicRoutes(currentUser)}

              {/* we do not know this url , and so the user status does not matter */}
              {currentPath.isUnknown &&
                getMappedRoutes(
                  getLast(publicProtectedFlattenRoutes),
                  currentUser
                )}

              <Route path="/cardview" element={<CardView />} />
              <Route path="/loweryhill" element={<LoweryHillView />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </Suspense>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
