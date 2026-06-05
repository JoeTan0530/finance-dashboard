import { apiCaller } from "../utils/general.js";

const getExpenseApiUrl = () => {
  return process.env.REACT_APP_QUERY_URL_EXPENSES || process.env.REACT_APP_QUERY_URL;
};

const getPageLimit = () => {
  return Number(process.env.REACT_APP_EXPENSE_PAGE_LIMIT || 10);
};

export const getExpenseList = (pageNum, callback) => {
  const params = {
    url: getExpenseApiUrl(),
    urlParams: {
      command: "getExpenseList",
      params: {
        page: pageNum,
        limit: getPageLimit(),
      },
    },
  };

  apiCaller("POST", params, callback);
};

export const getExpenseItem = (expenseID, callback) => {
  const params = {
    url: getExpenseApiUrl(),
    urlParams: {
      command: "getExpenseItem",
      params: {
        expenseID,
      },
    },
  };

  apiCaller("POST", params, callback);
};

export const addExpense = (payload, callback, setErrMsg) => {
  const params = {
    url: getExpenseApiUrl(),
    urlParams: {
      command: "addExpense",
      params: payload,
    },
  };

  apiCaller("POST", params, callback, setErrMsg);
};

export const editExpense = (payload, callback, setErrMsg) => {
  const params = {
    url: getExpenseApiUrl(),
    urlParams: {
      command: "editExpense",
      params: payload,
    },
  };

  apiCaller("POST", params, callback, setErrMsg);
};

export const removeExpense = (expenseID, callback) => {
  const params = {
    url: getExpenseApiUrl(),
    urlParams: {
      command: "removeExpense",
      params: {
        expenseID,
      },
    },
  };

  apiCaller("POST", params, callback);
};
