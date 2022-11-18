import React, { useEffect } from "react";
import logo from "../../logo.svg";

const Home = () => {
  // useEffect(() => {
  //   document.body.style.backgroundColor = "silver";
  // }, []);
  return (
    <>
      <div className="text-center my-3">
        {/* <h1 className="my-3">CT-Dev</h1> */}
      </div>
      <div className="d-flex justify-content-center">
        <img src={logo} className="App-logo mb-4" alt="logo" />
      </div>
    </>
  );
};
export default Home;
