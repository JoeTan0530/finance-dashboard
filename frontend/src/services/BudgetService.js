import { apiCaller } from "../utils/general.js";

const  getBudgetApiUrl = () => {
	return process.env.REACT_APP_QUERY_URL_BUDGET || process.env.REACT_APP_QUERY_URL;
}

export const getBudgetOptions = (callback) => {
	const params = {
		url: getBudgetApiUrl(),
		urlParams: {
			command: "getBudgetOptions",
			params: {}
		},
	};

	apiCaller("POST", params, callback);
}

export const getBudgetList = (callback) => {
	const params = {
		url: getBudgetApiUrl(),
		urlParams: {
			command: "getBudgetList",
			params: {}
		},
	};

	apiCaller("POST", params, callback);
}

export const addBudgetItem = (payload, callback, setErrMsg) => {
	const params = {
		url: getBudgetApiUrl(),
		urlParams: {
			command: "addBudgetItem",
			params: payload
		},
	};

	apiCaller("POST", params, callback, setErrMsg);
}

export const editBudgetItem = (payload, callback, setErrMsg) => {
	const params = {
		url: getBudgetApiUrl(),
		urlParams: {
			command: "editBudgetItem",
			params: payload
		}
	};

	apiCaller("POST", params, callback);
}

export const removeBudget = (budgetID, callback) => {
	const params = {
		url: getBudgetApiUrl(),
		urlParams: {
			command: "removeBudget",
			params: {
				budgetID
			}
		}
	};

	apiCaller("POST", params, callback);
}

