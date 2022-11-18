import "./App.css";
import { useState, useEffect } from "react";
import userService from "./services/userService";
import { UserContext } from "./context/appContext";
import Layout from "./layouts/Layout";

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    isLoggedIn: false,
    roles: ["Admin"],
    // changeUser: changeUser
  });

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
      newUser.id = res.id;
      newUser.firstName = res.firstName;
      newUser.lastName = res.lastName;
      newUser.email = res.email;
      newUser.avatarUrl = res.avatarUrl;
      newUser.isLoggedIn = res.isLoggedIn;
      newUser.changeUser = changeUser;
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

  return (
    // <Router basename={process.env.PUBLIC_URL}>
    <UserContext.Provider value={currentUser}>
      <Layout currentUser={currentUser} />
    </UserContext.Provider>
    //</Router>
  );
}

export default App;
