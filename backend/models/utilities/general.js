const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const generateReturnObj = (type, returnCode, dataReturn = "", statusMsg = "") => {
	let tempObj = {
		status: "",
		code: 0,
		data: "",
		statusMsg: ""
	}

	if (type == "Success") {
		tempObj = {
			status: "ok",
			code: returnCode,
			data: dataReturn,
			statusMsg: statusMsg
		}
	} else if (type == "Error") {
		tempObj = {
			status: "error",
			code:  returnCode ? returnCode : 1,
			data: dataReturn,
			statusMsg: statusMsg
		}
	}

	return tempObj;
}

const verifyIdFormat = (checkingID, customErrorMsg = "Invalid ID format") => {
	if (!mongoose.Types.ObjectId.isValid(checkingID)) {
        return generateReturnObj("Error", 1, "", customErrorMsg);
    } else {
    	return checkingID;
    }
}

const mapCountObj = (countArray = {}, countKey = "count") => {
	let tempCountObj = {};

	if (countArray) {
		const countObj = Array.isArray(countArray) ? countArray[0] : countArray;
		for (let countObjKey in countObj) {
	        tempCountObj[countObjKey] = countObj[countObjKey].length > 0 ? (countObj[countObjKey][0][countKey] ? countObj[countObjKey][0][countKey] : countObj[countObjKey][0]['count']) : 0;
	    }
	}

    return tempCountObj;
}

const convertFirstCharToUpper = (itemString = "") => {
	let tempNewItemString = "";

	if (itemString && typeof itemString == "string" && itemString != "") {
		tempNewItemString = itemString.charAt(0).toUpperCase() + itemString.slice(1);
	}

	return tempNewItemString;
}

const decodeToken = (token = "") => {
	if (!token || token == "") {
		return generateReturnObj("Error", 2, "", "Invalid token, please relogin to get new valid login token.");
	}

	const JWT_SECRET = process.env.JWT_SECRET;

	try {
		const decodedToken = jwt.verify(token, JWT_SECRET);

		return decodedToken;
	} catch (error) {
		return generateReturnObj("Error", 2, "", error.message);
	}
}

// Export all functions
module.exports = {
    generateReturnObj,
    verifyIdFormat,
    mapCountObj,
    convertFirstCharToUpper,
    decodeToken
};