const request = require('supertest');
const app = require('../app');

let authToken;

beforeAll(async () => {
	// Create User and get token for testing
	const registerRes = await request(app).post('/api/auth').send({
			command: "registerUser",
			params: {
				email: "test.testinguseonly@custom-dev.biz",
				username: "JaneTesting123",
				password: "password123",
				confirmPassword: "password123"
			}
		});

	const loginRes = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: "test.testinguseonly@custom-dev.biz",
				password: "password123",
			}
		});

	authToken = loginRes.body.data.sessionToken;
});

describe('Expense API', () => {
	const testData = {
		amount: 50.90,
		category: "Fine Dining",
		description: "A delicious birthday meal."
	}

	// TEST: Invalid auth token
	test('POST /api/expenses - invalid auth token', async () => {
		const res = await request(app).post('/api/expenses').send({
			command: "addExpense",
			params: {
				amount: testData.amount,
				category: testData.category,
				description: testData.description
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Add expenses amount empty error
	test('POST /api/expenses - Add expense - amount empty error', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "addExpense",
			params: {
				amount: "",
				category: testData.category,
				description: testData.description
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Add expenses category empty error
	test('POST /api/expenses - Add expense - category empty error', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "addExpense",
			params: {
				amount: testData.amount,
				category: "",
				description: testData.description
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Add expenses description(optional) empty success
	test('POST /api/expenses - Add expense - description(optional) empty success', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "addExpense",
			params: {
				amount: testData.amount,
				category: testData.category,
				description: ""
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
	});

	const testData2 = {
		amount: 3580,
		category: "Entertaiment",
		description: "Membership purchase"
	}

	// TEST: Add expenses success addition
	test('POST /api/expenses - Add expense - success addition', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "addExpense",
			params: {
				amount: testData2.amount,
				category: testData2.category,
				description: testData2.description
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
	});

	let expenseItemID = "";

	// TEST: Get expenses list
	test('POST /api/expenses - Get expense list', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "getExpenseList",
			params: {}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
		expect(res.body.data).toHaveProperty('listing');
		expect(res.body.data).toHaveProperty('pagination');

		expenseItemID = res.body.data.listing[0].expenseID;
	});

	// TEST: Get expense item
	test('POST /api/expenses - Get expense item', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "getExpenseItem",
			params: {
				expenseID: expenseItemID
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
		expect(res.body.data).toHaveProperty('amount');
		expect(res.body.data).toHaveProperty('category');
		expect(res.body.data).toHaveProperty('description');
		expect(res.body.data).toHaveProperty('date');
	});

	const editTestData = {
		amount: 10000,
		category: "Donation",
		description: "Donation to charity organization.",
		date: "2026-06-03 10:04:40"
	}

	// TEST: Edit expense item
	test('POST /api/expenses - Get expense item', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "editExpense",
			params: {
				expenseID: expenseItemID,
				amount: editTestData.amount,
				category: editTestData.category,
				description: editTestData.description,
				inputDate: editTestData.date
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
		
		const verifyEditRes = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "getExpenseItem",
			params: {
				expenseID: expenseItemID
			}
		});

		expect(verifyEditRes.statusCode).toBe(200);
		expect(verifyEditRes.body).toHaveProperty('status');
		expect(verifyEditRes.body.status).toBe('ok');
		expect(verifyEditRes.body.data).toHaveProperty('amount');
		expect(verifyEditRes.body.data).toHaveProperty('category');
		expect(verifyEditRes.body.data).toHaveProperty('description');
		expect(verifyEditRes.body.data.amount).toBe(editTestData.amount);
		expect(verifyEditRes.body.data.category).toBe(editTestData.category.toLowerCase());
		expect(verifyEditRes.body.data.description).toBe(editTestData.description);
	});

	// TEST: Delete expense item
	test('POST /api/expenses - Delete expense item', async () => {
		const res = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "removeExpense",
			params: {
				expenseID: expenseItemID
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');

		const verifyDeleteRes = await request(app).post('/api/expenses').set('Authorization', `Bearer ${authToken}`).send({
			command: "getExpenseItem",
			params: {
				expenseID: expenseItemID
			}
		});

		expect(verifyDeleteRes.statusCode).toBe(200);
		expect(verifyDeleteRes.body).toHaveProperty('status');
		expect(verifyDeleteRes.body.status).toBe('error');
	});


});