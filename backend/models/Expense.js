const  mongoose = require('mongoose');
const {
	generateReturnObj,
	verifyIdFormat
} = require('./utilities/general');

const Category = require('./Category');

const minimumAmt = 0.01;

const expenseSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		required: true,
		min: minimumAmt
	},
	category: {
		type: String,
		required: true
	}, 
	description: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true // Adds createdAt and updatedAt automatically
});

expenseSchema.statics.getExpenseItem = async function(params) {
	const {
		userID,
		expenseID
	} = params;

	const verifiedExpenseID = verifyIdFormat(expenseID);

	if (verifiedExpenseID['status'] && verifiedExpenseID['status'] == "error") {
		return verifiedExpenseID;
	}

	const verifiedUserID = verifyIdFormat(userID);

	if (verifiedUserID['status'] && verifiedUserID['status'] == "error") {
		return verifiedUserID;
	}

	const expenseItemRes = await this.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(verifiedExpenseID),
				user_id: new mongoose.Types.ObjectId(verifiedUserID)
			}
		},
		{
			$project: {
				_id: 0,
				amount: 1,
				category: 1,
				description: 1,
				date: {
					$dateToString: {
						format: "%Y-%m-%d %H:%M:%S",
						date: "$date"
					}
				}
			}
		}
	]);

	if (expenseItemRes && expenseItemRes.length > 0) {
		return generateReturnObj("Success", 0, expenseItemRes[0], "");
	} else {
		return generateReturnObj("Error", 2, "", "Unable to retrieve expense information.");
	}
}

expenseSchema.statics.getExpenseList = async function(params) {
	const {
		userID,
		page = 1,
		limit = 10,
		category = "",
	} = params;

	const skip = (page - 1) * limit;

	const verifyUserID = verifyIdFormat(userID);

	if (!userID || userID == "" || (verifyUserID['status'] && verifyUserID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid user ID.");
	}	

	let matchCondition = {
		user_id: new mongoose.Types.ObjectId(verifyUserID)
	};

	if (category && category != "") {
		matchCondition.category = category;
	}

	const expenseListRes = await this.aggregate([
		{
			$match: matchCondition
		},
		{
			$project: {
				_id: 0,
				expenseID: "$_id",
				amount: 1,
				category: 1,
				description: 1,
				date: 1,
				createdAt: {
					$dateToString: {
						format: "%Y-%m-%d %H:%M:%S",
						date: "$createdAt"
					}
				}
			}
		},
		{
			$sort: {
				createdAt: -1
			}
		},
		{
			$skip: skip
		},
		{
			$limit: limit
		}
	]);

	const expensePaginationRes = await this.getPagination({listingCondition: matchCondition, page: page, limit: limit});

	if (expenseListRes && expenseListRes.length > 0) {
		let listingObj = {
			listing: expenseListRes,
			pagination: expensePaginationRes
		}

		return generateReturnObj("Success", 0, listingObj);
	} else {
		return generateReturnObj("Success", 0, "", "No result found");
	}
}

expenseSchema.statics.getPagination = async function(params) {
	const {
		listingCondition,
		page,
		limit
	} = params;

	const paginationRes = await this.aggregate([
		{
			$match: listingCondition
		},
		{
			$facet: {
				totalRecord: [
					{
						$count: "count"
					}
				]
			}
		}
	]);

	// Default pagination info.
	let paginationObj = {
		pageNumber: 1,
		numRecord: limit,
		totalRecord: 0,
		totalPage: 0
	}

	if (paginationRes && paginationRes[0]['totalRecord'] && paginationRes[0]['totalRecord'].length > 0) {
		const totalRecordData = paginationRes[0]['totalRecord'][0]['count'];

		paginationObj = {
			pageNumber: page,
			numRecord: limit,
			totalRecord: totalRecordData,
			totalPage: Math.ceil(totalRecordData / limit)
		}
	}

	return paginationObj;
}

expenseSchema.statics.getDateRangeExpense = async function(params) {
	const {
		userID,
		type
	} = params;

	const verifyUserID = verifyIdFormat(userID);

	if (!userID || userID == "" || (verifyUserID['status'] && verifyUserID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid user ID.");
	}

	if (!type || type == "") {
		return generateReturnObj("Success", 0, [], "No result found");
	}

	const today = new Date();

	let startDate;
	let endDate;

	switch (type) {
		case "weekly":
			// Get Monday of the week.
			const day = today.getDay();
			const dayDiff1 = (day === 0 ? -6 : 1) - day;
			const monday = new Date(today);
			monday.setDate(today.getDate() + dayDiff1);
			startDate = monday;

			// Get Sunday of the week.
			const dayDiff2 = (day === 0 ? 0 : 7) - day;
			const sunday = new Date(today);
			sunday.setDate(today.getDate() + dayDiff2);
			endDate = sunday;
			break;
		case "monthly":
			startDate = new Date(today.getFullYear(), today.getMonth(), 1);
			endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
			break;
		default:
			return generateReturnObj("Success", 0, [], "No result found");
	}

	const dateRangeDataRes = await this.aggregate([
		{
			$match: {
				user_id: new mongoose.Types.ObjectId(verifyUserID),
				date: {
					$gte: startDate,
					$lte: endDate
				}
			}
		},
		{
			$project: {
				_id: 0,
				amount: 1,
				category: 1,
				date: 1
			}
		},
		{
			$sort: {
				createdAt: -1
			}
		},
	]);

	if (dateRangeDataRes && dateRangeDataRes.length > 0) {
		return generateReturnObj("Success", 0, dateRangeDataRes);
	} else {
		return generateReturnObj("Success", 0, [], "No result found");	
	}
}

expenseSchema.statics.addExpense = async function(params) {
	const {
		userID,
		amount,
		category,
		description,
		inputDate
	} = params;

	const verifyUserID = verifyIdFormat(userID);

	if (!userID || userID == "" || (verifyUserID['status'] && verifyUserID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid user ID.");
	}	

	if (!amount || amount < minimumAmt) {
		return generateReturnObj("Error", 1, "", `Invalid amount, the amount must be more than RM${minimumAmt}.`);
	}

	if (!category || category == "") {
		return generateReturnObj("Error", 1, "", "Invalid category.");
	}

	const recordedCategory = await Category.checkAndAddCategory({categoryName: category});

	const newExpense = new this({
		user_id: verifyUserID,
		amount: amount,
		category: recordedCategory,
		description: description,
		date: inputDate
	});

	await newExpense.save();

	return generateReturnObj("Success", 0, "", "Successfully added expense.");
}

expenseSchema.statics.editExpense = async function(params) {
	const {
		expenseID,
		amount,
		category,
		description,
		inputDate
	} = params;

	const verifiedExpenseID = verifyIdFormat(expenseID);

	if (!expenseID || expenseID == "" || (verifiedExpenseID['status'] && verifiedExpenseID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid expense ID.");
	}

	if (!amount || amount < minimumAmt) {
		return generateReturnObj("Error", 1, "", `Invalid amount, the amount must be more than RM${minimumAmt}.`);
	}

	if (!category || category == "") {
		return generateReturnObj("Error", 1, "", "Invalid category.");
	}

	const recordedCategory = await Category.checkAndAddCategory({categoryName: category});

	const expenseItem = await this.findById(verifiedExpenseID);

	if (expenseItem) {
		expenseItem.amount = amount;
		expenseItem.category = recordedCategory;
		expenseItem.description = description;
		expenseItem.date = inputDate;

		await expenseItem.save();

		return generateReturnObj("Success", 0, "", "Successfully updated expense record.");
	} else {
		return generateReturnObj("Error", 1, "", "Unable to update expense record, please contact admin.");
	}
}

expenseSchema.statics.removeExpense = async function(params) {
	const {
		expenseID
	} = params;

	const verifiedExpenseID = verifyIdFormat(expenseID);

	if (!expenseID || expenseID == "" || (verifiedExpenseID['status'] && verifiedExpenseID['status'] == "error")) {
		return generateReturnObj("Error", 2, "", "Invalid expense ID.");
	}

	const deletedItemRes = await this.findByIdAndDelete(verifiedExpenseID);

	if (deletedItemRes) {
		return generateReturnObj("Success", 0, "", "Successfully removed expense record.");
	} else {
		return generateReturnObj("Error", 2, "", "Unable to remove expense record, please contact admin");
	}
}

module.exports = mongoose.model('Expenses', expenseSchema);