import React from "react";
import { loginEndpoint } from "../../../spotify";
import "../../music/music.css";

const Login = () => {
  return (
    <div className="login-page">
      <img
        src="https://cdn.usbrandcolors.com/images/logos/spotify-logo.svg"
        alt="logo-spotify"
        className="logo"
      />
      <a href={loginEndpoint}>
        <div className="login-btn">LOG IN</div>
      </a>
    </div>
  );
};

export default Login;
