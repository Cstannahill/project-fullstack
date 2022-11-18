import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./SidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../../spotify";

const Sidebar = () => {
  //need to get avatarUrl for loggedIn user here
  const [image, setImage] = useState(
    "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10102209427401829&height=50&width=50&ext=1671279200&hash=AeTDiU1Dh5RemhmKb60"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);
  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SidebarButton
          title="Feed"
          to="/music/feed"
          icon={<MdSpaceDashboard />}
        />
        <SidebarButton
          title="Trending"
          to="/music/trending"
          icon={<FaGripfire />}
        />
        <SidebarButton title="Player" to="/music/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/music/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton
          title="Playlists"
          to="/music/playlists"
          icon={<IoLibrary />}
        />
      </div>
      <SidebarButton
        title="Sign Out"
        to="/music/login"
        icon={<FaSignOutAlt />}
      />
    </div>
  );
};

export default Sidebar;
