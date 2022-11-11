import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

// import "./Music.css";

const NowPlaying = () => {
  // useEffect(() => {
  //   document.body.style.backgroundColor = "rgba(23, 22, 22, 0.935)";
  //   document.body.style.color = "silver";
  // }, []);

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "https://localhost:3000/music/nowplaying";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"50%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };
  return (
    <>
      <div className="d-flex justify-content-center p-2">
        <h1 className="justify-content-center">Now Playing</h1>
      </div>
      <div className="Spotify">
        <header className="Spotify-header">
          <h1>Spotify</h1>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </header>
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
        {renderArtists()}
      </div>
    </>
  );
};

export default NowPlaying;
