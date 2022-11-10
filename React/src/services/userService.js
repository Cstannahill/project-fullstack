import axios from "axios";

const userUrl = process.env.REACT_APP_API_HOST + "/users";
const registerAccount = (payload) => {
  const config = {
    method: "POST",
    url: userUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.item);
};

const login = (payload) => {
  const config = {
    method: "POST",
    url: `${userUrl}/login`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => response.item);
};

const emailConfirm = (token) => {
  const config = {
    method: "PUT",
    url: `${userUrl}/confirm/${token}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.item);
};

const logout = () => {
  const config = {
    method: "GET",
    url: `${userUrl}/logout`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getCurrent = () => {
  const config = {
    method: "GET",
    url: `${userUrl}/current`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => response.data.item);
};

const userService = {
  registerAccount,
  login,
  emailConfirm,
  getCurrent,
  logout,
};
export default userService;
