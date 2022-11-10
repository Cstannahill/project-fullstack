import axios from "axios";
const appUrl = process.env.REACT_APP_API_HOST + "/applications";
const createApplication = (payload) => {
  const config = {
    method: "POST",
    url: appUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const updateApplication = (payload) => {
  const config = {
    method: "PUT",
    url: `${appUrl}/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const closeApplication = (id) => {
  const config = {
    method: "PUT",
    url: `${appUrl}/close/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const getAllApplications = () => {
  const config = {
    method: "GET",
    url: appUrl,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const applicationService = {
  createApplication,
  getAllApplications,
  updateApplication,
  closeApplication,
};
export default applicationService;
