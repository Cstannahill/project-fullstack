import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import apiClient from "../../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./playlist.css";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/music/player", { state: { id: id } });
  };

  return (
    <div className="main-body">
      <Sidebar />
      <div className="screen-container">
        <div className="library-body">
          {playlists?.map((playlist) => (
            <div
              className="playlist-card"
              key={playlist.id}
              onClick={() => playPlaylist(playlist.id)}
            >
              <img
                src={playlist.images[0].url}
                className="playlist-image"
                alt="Playlist-Art"
              />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider
                  value={{ size: "50px", color: "#E99D72" }}
                >
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
