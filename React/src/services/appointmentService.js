import axios from "axios";
const appointmentUrl = process.env.REACT_APP_API_HOST + "/appointments";
const createAppointment = (payload) => {
  const config = {
    method: "POST",
    url: appointmentUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const getAppointments = () => {
  const config = {
    method: "GET",
    url: appointmentUrl,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const appointmentService = { createAppointment, getAppointments };
export default appointmentService;
