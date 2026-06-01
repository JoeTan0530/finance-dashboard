const mongoose = require('mongoose');
const {
	generateReturnObj,
	verifyIdFormat,
	convertFirstCharToUpper
} = require('./utilities/general');

const categorySchema = new mongoose.Schema({
	category_value: {
		type: String,
		required: true
	},
	category_name: {
		type: String,
		required: true
	}
},{
	timestamps: true // Adds createdAt and updatedAt automatically
});

categorySchema.statics.getCategoryList = async function(params) {
	const { internalUse = false, type = "list" } = params;

	let categoryList = [];

	const categoryRes = await this.find().sort({category_name: 1});

	if (categoryRes && categoryRes.length > 0) {
		let mappedData = {};

		for (const categoryObj of categoryRes) {
			categoryList.push({
				value: categoryObj['category_value'],
				label: categoryObj['category_name']
			});	

			mappedData[categoryObj['category_value']] = categoryObj['category_name'];
		}

		if (type == "map") {
			categoryList = mappedData;
		}
	}

	if (internalUse) {
		return categoryList;
	} else {
		return generateReturnObj("Success", 0, categoryList, "");
	}
}

categorySchema.statics.checkAndAddCategory = async function(params) {
	const { categoryName } = params;

	const verifiedCategoryRes = await this.verifyUniqueCategory(categoryName);

	let categoryID = "";

	if (verifiedCategoryRes && verifiedCategoryRes == "new") {
		const tempCategoryName = String(categoryName).toLowerCase();
		const newCategory = new this({
			category_value: tempCategoryName,
			category_name: convertFirstCharToUpper(tempCategoryName),
		});

		const addCategoryRes = await newCategory.save();

		if (addCategoryRes && addCategoryRes['category_value']) {
			categoryID = addCategoryRes['category_value'];
		}
	} else {
		categoryID = verifiedCategoryRes;
	}

	return categoryID;
}

categorySchema.statics.verifyUniqueCategory = async function(inputItem) {
	if (!inputItem) {
		return false;
	}

	let checkingVal = (typeof inputItem == "string" ? inputItem : String(inputItem));

	const checkCategoryRes = await this.find({category_value: checkingVal.toLowerCase()});

	let categoryID = "";

	if (checkCategoryRes && checkCategoryRes.length > 0) {
		categoryID = checkCategoryRes[0]['category_value'];
	} else {
		categoryID = "new";
	}

	return categoryID;
}

module.exports = mongoose.model('Category', categorySchema);