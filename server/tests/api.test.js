const request = require('supertest');
const { app, server } = require('../src/server');
const { connectDB, disconnectDB } = require('../src/config/database');
const User = require('../src/models/User');
const Recipe = require('../src/models/Recipe');

describe('User Authentication Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await disconnectDB();
    server.close();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/users/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it('should not register with invalid email', async () => {
      const res = await request(app).post('/api/users/register').send({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(res.statusCode).toBe(400);
    });

    it('should not register with mismatched passwords', async () => {
      const res = await request(app).post('/api/users/register').send({
        name: 'Test User',
        email: 'test2@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/users/login', () => {
    beforeAll(async () => {
      await request(app).post('/api/users/register').send({
        name: 'Login Test User',
        email: 'logintest@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });

    it('should login successfully', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'logintest@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it('should not login with wrong password', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'logintest@example.com',
        password: 'wrongpassword',
      });

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Recipe Tests', () => {
  let token;

  beforeAll(async () => {
    await connectDB();
    const res = await request(app).post('/api/users/register').send({
      name: 'Recipe Test User',
      email: 'recipe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
    await disconnectDB();
    server.close();
  });

  describe('GET /api/recipes', () => {
    it('should get all recipes', async () => {
      const res = await request(app).get('/api/recipes');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.recipes).toBeDefined();
    });
  });

  describe('POST /api/recipes', () => {
    it('should create a new recipe', async () => {
      const res = await request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Recipe',
          ingredients: [{ item: 'flour', quantity: '2', unit: 'cups' }],
          directions: ['Mix ingredients', 'Bake at 350F'],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.recipe).toBeDefined();
    });

    it('should not create recipe without authentication', async () => {
      const res = await request(app).post('/api/recipes').send({
        title: 'Test Recipe',
        ingredients: [{ item: 'flour', quantity: '2', unit: 'cups' }],
        directions: ['Mix ingredients', 'Bake at 350F'],
      });

      expect(res.statusCode).toBe(401);
    });
  });
});
