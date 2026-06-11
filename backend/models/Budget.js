const mongoose = require('mongoose');
const {
	generateReturnObj,
	verifyIdFormat,
	convertMillisecToSec
} = require('./utilities/general');

const Expense = require('./Expense');

const minimumAmt = 0.01;

const budgetSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	type: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true,
		min: minimumAmt
	}
}, {
	timestamps: true
});

budgetSchema.statics.getBudgetOptions = async function(internalUse = false) {
	const optionList = [
		{
			label: "Daily",
			value: "daily"
		},
		{
			label: "Weekly",
			value: "weekly"
		},
		{
			label: "Monthly",
			value: "monthly"
		},
	];

	if (internalUse) {
		return optionList;
	} else {
		return generateReturnObj("Success", 0, optionList, "");
	}
}

budgetSchema.statics.getBudgetList = async function(params) {
	const {
		userID
	} = params;

	const verifiedUserID = verifyIdFormat(userID);

	if (verifiedUserID['status'] && verifiedUserID['status'] == "error") {
		return verifiedUserID;
	}

	const budgetListRes = await this.aggregate([
		{
			$match: {
				user_id: new mongoose.Types.ObjectId(verifiedUserID)
			}
		}, 
		{
			$project: {
				_id: 0,
				budgetID: "$_id",
				amount: 1,
				type: 1,
			}
		},
		{
			$sort: {
				createdAt: -1
			}
		},
	]);

	if (budgetListRes && budgetListRes.length > 0) {
		// Map type list for value display update before returning the data.
		const budgetTypeList = await this.getBudgetOptions(true);
		let tempTypeMap = {};
		for (const budgetItem of budgetTypeList) {
			tempTypeMap[budgetItem.value] = budgetItem.label;
		}

		// Get expense records for the month and calculate the expense for the budget limit.
		let totalExpenseObj = {
			daily: 0,
			weekly: 0,
			monthly: 0,
		}

		const expenseRes = await Expense.getDateRangeExpense({userID: userID, type: "monthly"});

		if (expenseRes['status'] && expenseRes['status'] == "ok" && expenseRes.data.length > 0) {
			const today = new Date();

			// Get Monday of the week.
			const day = today.getDay();
			const dayDiff1 = (day === 0 ? -6 : 1) - day;
			const monday = new Date(today);
			monday.setDate(today.getDate() + dayDiff1);
			const mondayTS = convertMillisecToSec(monday.getTime());

			// Get Sunday of the week.
			const dayDiff2 = (day === 0 ? 0 : 7) - day;
			const sunday = new Date(today);
			sunday.setDate(today.getDate() + dayDiff2);
			const sundayTS = convertMillisecToSec(sunday.getTime());

			// Get date range for today
			const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
			const todayStartTS = convertMillisecToSec(todayStart.getTime());

			const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
			const todayEndTS = convertMillisecToSec(todayEnd.getTime());

			let tempDateTimeStamp;

			const expenseData = expenseRes.data;

			for (const expenseItem of expenseData) {
				tempDateTimeStamp = convertMillisecToSec(new Date(expenseItem.date).getTime());

				if (tempDateTimeStamp >= todayStartTS && tempDateTimeStamp <= todayEndTS) {
					totalExpenseObj['daily'] += Number(expenseItem.amount);
				}

				if (tempDateTimeStamp >= mondayTS && tempDateTimeStamp <= sundayTS) {
					totalExpenseObj['weekly'] += Number(expenseItem.amount);
				}

				totalExpenseObj['monthly'] += Number(expenseItem.amount);
			}
		}
		let tempNewBudgetList = [];

		budgetListRes.forEach((item, index) => {
			tempNewBudgetList.push({
				budgetID: item.budgetID,
				type: tempTypeMap[item.type],
				totalExpense: totalExpenseObj[item.type] ? totalExpenseObj[item.type] : 0,
				amount: item.amount
			});
		});

		return generateReturnObj("Success", 0, tempNewBudgetList);

	} else {
		return generateReturnObj("Success", 0, "", "No results found.");
	}
}

budgetSchema.statics.addBudgetItem = async function(params) {
	const {
		userID,
		type,
		amount
	} = params;

	const verifiedUserID = verifyIdFormat(userID);

	if (verifiedUserID['status'] && verifiedUserID['status'] == "error") {
		return verifiedUserID;
	}

	// Check and verify the type selected or submitted is one of the valid types.
	const validTypeRes = await this.verifyValidBudgetType(type);

	if (validTypeRes['status'] && validTypeRes['status'] == "error") {
		return validTypeRes;
	}

	if (!amount || amount < minimumAmt) {
		return generateReturnObj("Error", 1, "", `Invalid amount, the amount must be more than RM${minimumAmt}`);
	}

	// Check and verify this new type to be added is not existing yet.
	const verifiedUniqueTypeRes = await this.verifyUniqueBudgetType(verifiedUserID, type);

	if (verifiedUniqueTypeRes['status'] && verifiedUniqueTypeRes['status'] == "error") {
		return verifiedUniqueTypeRes;
	}

	const newBudget = new this({
		user_id: verifiedUserID,
		amount: amount,
		type: type
	});

	await newBudget.save();

	return generateReturnObj("Success", 0, "", "Successfully added budget.");
}

budgetSchema.statics.editBudgetItem = async function(params) {
	const {
		userID,
		budgetID,
		type,
		amount
	} = params;

	const verifiedUserID = verifyIdFormat(userID);

	if (verifiedUserID['status'] && verifiedUserID['status'] == "error") {
		return verifiedUserID;
	}

	const verifiedBudgetID = verifyIdFormat(budgetID);

	if (verifiedBudgetID['status'] && verifiedBudgetID['status'] == "error") {
		return verifiedBudgetID;
	}

	// Check and verify the type selected or submitted is one of the valid types.
	const validTypeRes = await this.verifyValidBudgetType(type);
	if (validTypeRes['status'] && validTypeRes['status'] == "error") {
		return validTypeRes;
	}

	if (!amount || amount < minimumAmt) {
		return generateReturnObj("Error", 1, "", `Invalid amount, the amount must be more than RM${minimumAmt}`);
	}

	// Check and verify this new type to be added is not existing yet.
	const verifiedUniqueTypeRes = await this.verifyUniqueBudgetType(verifiedUserID, type, verifiedBudgetID);

	if (verifiedUniqueTypeRes['status'] && verifiedUniqueTypeRes['status'] == "error") {
		return verifiedUniqueTypeRes;
	}

	const budgetItem = await this.findById(verifiedBudgetID);

	if (budgetItem) {
		budgetItem.amount = amount;
		budgetItem.type = type;

		await budgetItem.save();

		return generateReturnObj("Success", 0, "", "Successfully updated budget setting.");

	} else {
		return generateReturnObj("Error", 1, "", "Unable to update budget record, please contact admin.");
	}
}

budgetSchema.statics.verifyUniqueBudgetType = async function (checkingUserID, selectedType, checkingBudgetID = "") {
	const budgetTypeList = await this.getBudgetOptions(true);

	const existingBudgetRes = await this.aggregate([
		{
			$match: {
				user_id: checkingUserID
			}
		}, 
		{
			$project: {
				_id: 0,
				budgetID: "$_id",
				// amount: 1,
				type: 1,
			}
		}
	]);

	if (existingBudgetRes && existingBudgetRes.length > 0) {
		const duplicateObj = existingBudgetRes.find((existItem) => {
			return existItem['type'] == selectedType;
		});

		if (duplicateObj) {
			if (checkingBudgetID != duplicateObj['budgetID']) {
				const duplicateType = budgetTypeList.find((item) => {
					return item.value == selectedType;
				});

				return generateReturnObj("Error", 1, "", `${duplicateType['label']} is already in use, please select a different type.`);
			}
		}
	}
		
	return generateReturnObj("Success", 0, "", "Type is unique to user.");
}

budgetSchema.statics.verifyValidBudgetType = async function (selectedBudgetType) {
	const budgetTypeList = await this.getBudgetOptions(true);
	let optionFound = false;

	for (const typeItem of budgetTypeList) {
		if (typeItem['value'] === selectedBudgetType) {
			optionFound = true;
			break;
		}
	}

	if (!optionFound) {
		return generateReturnObj("Error", 1, "", "Invalid type, please select a valid type.");
	} else {
		return generateReturnObj("Success", 0, "", "Type is valid.");
	}
}

budgetSchema.statics.removeBudget = async function (params) {
	const {
		budgetID
	} = params;

	const verifiedBudgetID = verifyIdFormat(budgetID);

	if (!budgetID || budgetID == "" || (verifiedBudgetID['status'] && verifiedBudgetID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid budget ID.");
	}

	const deletedItemRes = await this.findByIdAndDelete(verifiedBudgetID);

	if (deletedItemRes) {
		return generateReturnObj("Success", 0, "", "Successfully removed budget setting.");
	} else {
		return generateReturnObj("Error", 2, "", "Unable to remove budget setting.");
	}
}

module.exports = mongoose.model("Budgets", budgetSchema);