const mongoose = require('mongoose');
const {
	generateReturnObj,
	verifyIdFormat,
	convertFirstCharToUpper
} = require('./utilities/general');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	full_name: {
		type: String,
	},
	password: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	}
}, {
	timestamps: true // Adds createdAt and updatedAt automatically
});

userSchema.statics.registerUser = async function(params) {
	const paramData = params;

	const requiredFieldArr = {
		email: "Email field cannot be empty.",
		username: "Username field cannot be empty.",
		password: "Password field cannot be empty.",
		confirmPassword: "Confirm password field cannot be empty."
	};

	if (paramData) {
		for (let fieldKey in requiredFieldArr) {
			let tempData = paramData[fieldKey];

			if (!tempData || tempData == "") {
				return generateReturnObj("Error", 1, "", requiredFieldArr[fieldKey]);
			}
		}

		// Verify 'Email' is unique
		const verifyEmailRes = await this.verifyUniqueItem("email", paramData['email']);

		if (verifyEmailRes['status'] && verifyEmailRes['status'] == "error")  {
			return verifyEmailRes;
		}

		// Verify 'Username' is unique
		const verifyUsernameRes = await this.verifyUniqueItem("username", paramData['username']);

		if (verifyUsernameRes['status'] && verifyUsernameRes['status'] == "error")  {
			return verifyUsernameRes;
		}

		// Verify 'Password' and 'Confirm Password' is matching
		if (paramData['confirmPassword'] != paramData['password']) {
			return generateReturnObj("Error", 1, "", "The password and confirmation password do not match.");
		}

		// Generate salt
		const saltRounds = Number(process.env.PASSWORD_SALT);
		const salt = await bcrypt.genSalt(saltRounds);

		// Hash the password with salt
		const encryptedPassword = await bcrypt.hash(paramData['password'], salt);

		// Setup data for DB entry
		const newUser = new this({
			username: paramData['username'],
			email: paramData['email'],
			password: encryptedPassword,
			full_name: paramData['fullName'],
		});

		// Save document instance to DB
		await newUser.save();

		return generateReturnObj("Success", 0, "", "Successfully registered account.");
	} else {
		return generateReturnObj("Error", 2, "", "Invalid Params");
	}
}

userSchema.statics.loginUser = async function (params) {
	const paramData = params;

	const requiredFieldArr = {
		email: "Email field cannot be empty.",
		password: "Password field cannot be empty."
	};

	if (paramData) {
		for (let fieldKey in requiredFieldArr) {
			let tempData = paramData[fieldKey];

			if (!tempData || tempData == "") {
				return generateReturnObj("Error", 1, "", requiredFieldArr[fieldKey]);
			}
		}

		const userRes = await this.getOneUserRecord("email", paramData['email']);

		if (userRes && userRes['status'] && userRes['status'] == "error") {
			return generateReturnObj("Error", 1, "", "Invalid log in details.");
		}

		const verifyPasswordRes = await userRes.comparePassword(paramData['password']);

		if (verifyPasswordRes && verifyPasswordRes['status'] && verifyPasswordRes['status'] == "error") {
			return verifyPasswordRes;
		}

		// Generate JWT token
		const JWT_SECRET = process.env.JWT_SECRET;

		if (!JWT_SECRET || JWT_SECRET == "") {
			return generateReturnObj("Error", 2, "", "Something went wrong, please contact admin.");
		}

		const generatedToken = jwt.sign(
			{
				userID: userRes['_id'],
				email: userRes['email'],
				fullName: userRes['full_name']
			},
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		const sessionData = {
			isLoginData: 1,
			sessionToken: generatedToken,
			clientID: userRes['_id'],
			userInfo: {
				name: userRes['full_name'],
				email: userRes['email']
			}
		};

		return generateReturnObj("Success", 0, sessionData, "Successfully logged in.");
	} else {
		return generateReturnObj("Error", 2, "", "Invalid Params");
	}
}

userSchema.statics.getOneUserRecord = async function(columnName, columnValue) {
	const userRecordRes = await this.find({[columnName]: columnValue}, {__v:0});

	if (userRecordRes && userRecordRes.length > 0) {
		return userRecordRes[0];
	} else {
		return generateReturnObj("Error", 2, `Invalid ${columnName} value.`);
	}
}

userSchema.statics.verifyUniqueItem = async function(checkingField, inputItem) {
	const checkItemRes = await this.find({[checkingField]: inputItem});

	if (checkItemRes && checkItemRes.length > 0) {
		let itemFieldName = convertFirstCharToUpper(checkingField);

		return generateReturnObj("Error", 1, "", `${itemFieldName} is already taken.`);
	} else {
		return generateReturnObj("Success", 0, "", "Item is Unique");
	}
}

userSchema.methods.comparePassword = async function(inputPassword) {
	try {
		const passwordCompareResult = await bcrypt.compare(inputPassword, this.password);

		if (passwordCompareResult) {
			return generateReturnObj("Success", 0, "", "Password verified.");
		} else {
			return generateReturnObj("Error", 1, "", "Invalid log in details.");
		}
	} catch (error) {
		throw generateReturnObj("Error", 2, "", "Password verification failed.");
	}
}

module.exports = mongoose.model('Users', userSchema);