import { apiCaller } from "../utils/general.js";

const getCategoryApiUrl = () => {
  return process.env.REACT_APP_QUERY_URL_CATEGORY || process.env.REACT_APP_QUERY_URL;
};

export const getCategoryList = (callback) => {
  const params = {
    url: getCategoryApiUrl(),
    urlParams: {
      command: "getCategoryList",
    },
  };

  apiCaller("POST", params, callback);
};
