import axios from "axios";
import { onGlobalError, onGlobalSuccess } from "./serviceHelper";

const musicUrl = process.env.REACT_APP_API_HOST + "/music";

const getAll = () => {
  const config = {
    method: "GET",
    url: musicUrl,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${musicUrl}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const musicServices = {
  getAll,
  getPaginated,
};

export default musicServices;
