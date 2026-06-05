import { apiCaller } from "../utils/general.js";

const getAuthApiUrl = () => {
  return process.env.REACT_APP_QUERY_URL_AUTH || process.env.REACT_APP_QUERY_URL;
};

export const loginUser = (payload, callback, setErrMsg) => {
  const params = {
    url: getAuthApiUrl(),
    urlParams: {
      command: "loginUser",
      params: payload,
    },
  };

  apiCaller("POST", params, callback, setErrMsg);
};

export const registerUser = (payload, callback, setErrMsg) => {
  const params = {
    url: getAuthApiUrl(),
    urlParams: {
      command: "registerUser",
      params: payload,
    },
  };

  apiCaller("POST", params, callback, setErrMsg);
};
