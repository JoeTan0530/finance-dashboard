const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateReturnObj } = require('../models/utilities/general');

// POST new book
router.post('/', async (req, res) => {
    try {
        let request = req.body;

        let response = {};

        let command = request.command;

        let params = request.params;

        switch (command) {
            case "registerUser":
				response = await User.registerUser(params);
				break;
			case "loginUser":
				response = await User.loginUser(params);
				break;
            default:
                response = generateReturnObj("Error", 1, "", "Invalid command.");
        }

        // res.status(201).json(response);
        res.status(200).json(response);

    } catch (error) {
        let errorResponse = generateReturnObj("Error", 2, "", error.message);
        res.status(400).json(errorResponse);
    }
});

module.exports = router;