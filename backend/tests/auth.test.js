const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {
	const testData = {
		email: "joetan.ttwoweb@gmail.com",
		username: "JohnTesting123",
		password: "password123"
	}

	// TEST: Create user email empty error
	test('POST /api/auth - creates new user - email empty error', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: "",
					username: testData.username,
					password: testData.password,
					confirmPassword: testData.password
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Create user username empty error
	test('POST /api/auth - creates new user - username empty error', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: testData.email,
					username: "",
					password: testData.password,
					confirmPassword: testData.password
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Create user password empty error
	test('POST /api/auth - creates new user - password empty error', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: testData.email,
					username: testData.username,
					password: "",
					confirmPassword: testData.password
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Create user confirm password empty error
	test('POST /api/auth - creates new user - confirm password empty error', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: testData.email,
					username: testData.username,
					password: testData.password,
					confirmPassword: ""
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Create user password and confirm password mismatch error
	test('POST /api/auth - creates new user - password and confirm password mismatch error', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: testData.email,
					username: testData.username,
					password: testData.password,
					confirmPassword: "123password"
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: Create user success
	test('POST /api/auth - creates new user success', async () => {
		const res = await request(app).post('/api/auth').send({
				command: "registerUser",
				params: {
					email: testData.email,
					username: testData.username,
					password: testData.password,
					confirmPassword: testData.password
				}
			});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
	});

	// TEST: User login email empty
	test('POST /api/auth - user login - email field empty', async () => {
		const res = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: "",
				password: testData.password
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: User login password empty
	test('POST /api/auth - user login - password field empty', async () => {
		const res = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: testData.email,
				password: ""
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: User login invalid password
	test('POST /api/auth - user login - invalid password', async () => {
		const res = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: testData.email,
				password: "wrongpassword"
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: User login invalid email to password
	test('POST /api/auth - user login - invalid password', async () => {
		const res = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: "joetan.test@test.com",
				password: testData.password
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('error');
	});

	// TEST: User login successful login
	test('POST /api/auth - user login - successful login', async () => {
		const res = await request(app).post('/api/auth').send({
			command: "loginUser",
			params: {
				email: testData.email,
				password: testData.password
			}
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('status');
		expect(res.body.status).toBe('ok');
		expect(res.body.data).toHaveProperty('isLoginData');
		expect(res.body.data.isLoginData).toBe(1);
		expect(res.body.data).toHaveProperty('sessionToken');
	});
});