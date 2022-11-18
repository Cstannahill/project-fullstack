import axios from "axios";
const taskUrl = process.env.REACT_APP_API_HOST + "/tasks";
const createTask = (payload) => {
  const config = {
    method: "POST",
    url: taskUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const updateTask = (payload) => {
  const config = {
    method: "PUT",
    url: `${taskUrl}/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const getTaskBoardById = (id) => {
  const config = {
    method: "GET",
    url: `${taskUrl}/board/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const reorderTask = (payload) => {
  const config = {
    method: "PUT",
    url: `${taskUrl}/reorder`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const createLabel = (payload) => {
  const config = {
    method: "POST",
    url: `${taskUrl}/label`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return {
      ...response,
      ...payload,
    };
  });
};

const closeTask = (id) => {
  const config = {
    method: "DELETE",
    url: `${taskUrl}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const addLabel = (payload) => {
  const config = {
    method: "POST",
    url: `${taskUrl}/labelpairs`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const getAllTasks = () => {
  const config = {
    method: "GET",
    url: taskUrl,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data);
};

const getTaskBoardByUserId = () => {
  const config = {
    method: "GET",
    url: `${taskUrl}/user/boards`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data);
};

const getTaskById = (id) => {
  const config = {
    method: "GET",
    url: `${taskUrl}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((res) => res.data.item);
};

const TaskService = {
  createTask,
  getAllTasks,
  updateTask,
  closeTask,
  getTaskById,
  reorderTask,
  createLabel,
  getTaskBoardByUserId,
  getTaskBoardById,
  addLabel,
};
export default TaskService;
