import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { setClientToken } from "../../../spotify";
import Login from "../login/Login";
import Player from "../player/Player";
// import Favorites from "../favorites";
// import Feed from "../feed";
import Playlists from "../playlists/Playlists";
// import Trending from "../trending";
import "./home.css";

const MusicHome = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <>
      <div className="main-body">
        <Sidebar />
        <Link to="/music/playlists" element={<Playlists />} />
        <Link to="/music/home" element={<Login />} />
        <Link path="/music/player" element={<Player />} />
        {/* <Route path="/music/feed" element={<Feed />} />
          <Route path="/music/trending" element={<Trending />} />
          
          <Route path="/music/favorites" element={<Favorites />} /> */}
      </div>
    </>
  );
};

export default MusicHome;
