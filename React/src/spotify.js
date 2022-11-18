import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "https://localhost:3000/music/home";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${AUTH_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

// saves token as permanent header and appends header with every api call made
export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
