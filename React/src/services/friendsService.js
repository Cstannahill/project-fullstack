import axios from "axios";

const friendsEndpoint = process.env.REACT_APP_API_HOST + "/v3/friends";

const getFriends = (index, size) => {
  const config = {
    method: "GET",
    url: `${friendsEndpoint}/paginate/?pageIndex=${index}&&pageSize=${size}`,
    withCredentials: true,
    withoutCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: `${friendsEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const addFriend = (payload) => {
  const config = {
    method: "POST",
    url: friendsEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return {
      ...payload,
      id: response.data.item,
    };
  });
};

const updateFriend = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${friendsEndpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return {
      ...payload,
      id: id,
    };
  });
};

const getFriendById = (id) => {
  const config = {
    method: "GET",
    url: `${friendsEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return {
      id: response.data.item.id,
      bio: response.data.item.bio,
      title: response.data.item.title,
      summary: response.data.item.summary,
      headline: response.data.item.headline,
      statusId: response.data.item.statusId,
      slug: response.data.item.slug,
      primaryImage: response.data.item.primaryImage.imageUrl,
    };
  });
};

const getFriendBySearch = (pageIndex, pageSize, searchQuery) => {
  const config = {
    method: "GET",
    url: `${friendsEndpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${searchQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.pagedItems);
};

const friendsService = {
  getFriends,
  deleteFriend,
  addFriend,
  updateFriend,
  getFriendById,
  getFriendBySearch,
};
export default friendsService;
