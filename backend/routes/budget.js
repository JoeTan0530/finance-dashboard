const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const User = require('../models/User');
const { generateReturnObj, decodeToken } = require('../models/utilities/general');

router.use(async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	const decoded = decodeToken(token);

	if (decoded['status'] && decoded['status'] == "error") {
		res.status(200).json(decoded);
	} else {
		const verifiedLoginRes = await User.verifyLoginToken(token, decoded['userID']);

		if (verifiedLoginRes['status'] && verifiedLoginRes['status'] == "error") {
			res.status(200).json(verifiedLoginRes);
		} else {
			req.body.params.userID = decoded['userID'];
			next();
		}
	}
});

router.post('/', async (req, res) => {
	try {
		let request = req.body;

		let response = {};

		let command = request.command;

		let params = request.params;

		switch (command) {
			case "getBudgetList":
				response = await Budget.getBudgetList(params);
				break;
			case "getBudgetOptions":
				response = await Budget.getBudgetOptions();
				break;
			case "addBudgetItem":
				response = await Budget.addBudgetItem(params);
				break;
			case "editBudgetItem":
				response = await Budget.editBudgetItem(params);
				break;
			case "removeBudget":
				response = await Budget.removeBudget(params);
				break;
			default:
				response = generateReturnObj("Error", 1, "", "Invalid command.");
		}

		res.status(200).json(response);
	} catch (error) {
		let errorResponse = generateReturnObj("Error", 2, "", error.message);
        res.status(400).json(errorResponse);
	}
});

module.exports = router;