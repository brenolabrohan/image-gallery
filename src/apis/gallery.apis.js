import axios from "axios";

const access_key = process.env.REACT_APP_UNSPLASH_KEY;

export const getImages = async (page) => {
  const res = axios({
    method: "GET",
    url: `https://api.unsplash.com/photos`,
    params: {
      client_id: access_key,
      page: page,
    },
  });
  return res;
};

export const searchImage = async (query, page) => {
  const res = axios({
    method: "GET",
    url: `https://api.unsplash.com/search/photos`,
    params: {
      client_id: access_key,
      page: page,
      query: query,
    },
  });
  return res;
};
