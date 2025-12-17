# Recipe Search & Meal Planner - Backend Server

A comprehensive Node.js and Express-based backend server for the Recipe Search & Meal Planner application with MongoDB integration, real-time features using Socket.IO, and extensive data management capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Socket.IO Events](#socketio-events)
- [Testing](#testing)
- [File Structure](#file-structure)
- [Data Management](#data-management)

## ✨ Features

### Unit I: Data I/O & Promises
- **fs Module**: File system operations for data persistence
- **JSON Handling**: Structured data serialization
- **Stream Module**: Efficient data streaming for large files
- **Zlib Compression**: Compress/decompress data with Gzip
- **Async/Await**: Promise-based asynchronous operations

### Unit II: HTTP & Express Services
- **HTTP Module**: Core HTTP server implementation
- **Express Framework**: RESTful API development
- **Routing**: Modular route organization
- **Middleware**: Authentication, validation, error handling
- **Body Parser**: Request body parsing and validation
- **Express Validator**: Input validation for all routes

### Unit III: Real-Time Services & Middleware
- **Socket.IO**: Real-time bidirectional communication
- **WebSocket Support**: Live recipe sharing and notifications
- **Custom Middleware**: Authentication, session management
- **Cookie Parser**: Session cookie handling
- **Express Session**: User session management
- **CORS**: Cross-Origin Resource Sharing

### Unit IV: MongoDB & Mongoose
- **MongoDB Connection**: Secure database connectivity
- **Mongoose Schemas**: Structured data modeling
- **CRUD Operations**: Complete data manipulation
- **Relationships**: Document population and references
- **Data Validation**: Schema-level validation

### Unit V: PostgreSQL Support (Optional)
- Can be integrated for relational data
- Documentation for PostgreSQL setup included

### Unit VI: Testing & Deployment
- **Jest**: Unit and integration testing
- **Supertest**: API endpoint testing
- **GitHub Integration**: Version control ready
- **Deployment Ready**: Production-grade configuration

## 📦 Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB >= 4.0 (local or Atlas)
- Git

## 🚀 Installation

### 1. Clone and Setup

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-planner
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret_key_change_in_production
CORS_ORIGIN=http://localhost:3000
```

### 3. MongoDB Setup

#### Local MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create a cluster
3. Get connection string
4. Update `.env` file with connection string

### 4. Start Server

**Development Mode (with hot reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server runs on `http://localhost:5000`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/recipe-planner |
| `NODE_ENV` | Environment | development |
| `JWT_SECRET` | JWT signing key | your_jwt_secret_key |
| `JWT_EXPIRE` | Token expiration | 7d |
| `BCRYPT_ROUNDS` | Password hash rounds | 10 |
| `SESSION_SECRET` | Session encryption key | your_session_secret_key |
| `CORS_ORIGIN` | Frontend URL | http://localhost:3000 |

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Recipe Endpoints

#### Get All Recipes
```http
GET /api/recipes?page=1&limit=10&dietaryTags=vegetarian&search=pasta
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `dietaryTags`: Filter by diet (comma-separated)
- `difficulty`: easy, medium, hard
- `search`: Search in title/description

#### Get Recipe by ID
```http
GET /api/recipes/:id
```

#### Create Recipe (Protected)
```http
POST /api/recipes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pasta Carbonara",
  "description": "Traditional Italian pasta",
  "ingredients": [
    {
      "item": "pasta",
      "quantity": "400",
      "unit": "g"
    },
    {
      "item": "eggs",
      "quantity": "3",
      "unit": "whole"
    }
  ],
  "directions": [
    "Boil pasta",
    "Mix with sauce",
    "Serve hot"
  ],
  "nutrition": {
    "calories": 450,
    "protein": 15,
    "carbs": 65,
    "fats": 12
  },
  "servings": "4",
  "cookTime": "20 min"
}
```

#### Search by Ingredients
```http
GET /api/recipes/search/ingredients?ingredients=tomato,basil,olive oil
```

#### Add Review to Recipe (Protected)
```http
POST /api/recipes/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Delicious and easy to make!",
  "rating": 5
}
```

### Meal Plan Endpoints

#### Get User's Meal Plans (Protected)
```http
GET /api/meal-plans
Authorization: Bearer <token>
```

#### Create Meal Plan (Protected)
```http
POST /api/meal-plans
Authorization: Bearer <token>
Content-Type: application/json

{
  "weekStart": "2024-01-01T00:00:00Z",
  "weekEnd": "2024-01-07T23:59:59Z",
  "meals": [
    {
      "date": "2024-01-01T08:00:00Z",
      "mealType": "breakfast",
      "recipe": "507f1f77bcf86cd799439011",
      "servings": 2
    }
  ]
}
```

#### Add Meal to Plan (Protected)
```http
POST /api/meal-plans/:id/meals
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-01-02T12:00:00Z",
  "mealType": "lunch",
  "recipeId": "507f1f77bcf86cd799439011",
  "servings": 2,
  "notes": "Extra sauce"
}
```

### User Profile Endpoints

#### Get Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile (Protected)
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "dietaryPreferences": ["vegetarian", "gluten-free"]
}
```

#### Add to Favorites (Protected)
```http
POST /api/users/favorites/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipeId": "507f1f77bcf86cd799439011"
}
```

#### Add to Shopping List (Protected)
```http
POST /api/users/shopping-list/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "item": "Tomatoes",
  "quantity": "500g"
}
```

## 🔌 Socket.IO Events

Real-time features for live updates and notifications.

### Emit Events (Client → Server)

#### Join as User
```javascript
socket.emit('user-join', userId);
```

#### Share Recipe
```javascript
socket.emit('share-recipe', {
  userId: 'user123',
  recipe: { id, title, image }
});
```

#### Share Meal Plan
```javascript
socket.emit('share-meal-plan', {
  userId: 'user123',
  mealPlan: { id, meals, weekStart }
});
```

#### Send Chat Message
```javascript
socket.emit('chat-message', {
  userId: 'user123',
  message: 'Check out this amazing recipe!'
});
```

#### Send Notification
```javascript
socket.emit('send-notification', {
  userId: 'user123',
  message: 'Recipe added to meal plan',
  type: 'info'
});
```

### Listen Events (Server → Client)

#### User Status
```javascript
socket.on('user-status', (data) => {
  console.log(data.totalActive); // Number of active users
});
```

#### Recipe Shared
```javascript
socket.on('recipe-shared', (data) => {
  console.log(data.from, data.recipe);
});
```

#### Message Broadcast
```javascript
socket.on('message-broadcast', (data) => {
  console.log(data.userId, data.message, data.timestamp);
});
```

#### Notification
```javascript
socket.on('notification', (data) => {
  console.log(data.from, data.message, data.type);
});
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test File
```bash
npm test api.test.js
```

### Watch Mode
```bash
npm run test:watch
```

## 📁 File Structure

```
server/
├── src/
│   ├── config/
│   │   ├── env.js              # Environment configuration
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js   # User CRUD operations
│   │   ├── recipeController.js # Recipe management
│   │   └── mealPlanController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Recipe.js           # Recipe schema
│   │   └── MealPlan.js         # Meal plan schema
│   ├── routes/
│   │   ├── userRoutes.js       # User endpoints
│   │   ├── recipeRoutes.js     # Recipe endpoints
│   │   └── mealPlanRoutes.js   # Meal plan endpoints
│   ├── utils/
│   │   ├── fileManager.js      # File I/O and compression
│   │   └── dataManager.js      # Database utilities
│   └── server.js               # Main server file
├── tests/
│   ├── api.test.js             # API tests
│   └── fileManager.test.js     # File utility tests
├── package.json
├── .env
└── README.md
```

## 📊 Data Management

### File Operations

The server includes comprehensive file management utilities:

```javascript
const fileManager = require('./utils/fileManager');

// Write JSON
await fileManager.writeJsonFile('backup.json', data);

// Read JSON
const data = await fileManager.readJsonFile('backup.json');

// Compress file
await fileManager.compressFile('./data.json', './data.json.gz');

// Export with compression
await fileManager.exportDataCompressed('backup', data);

// Stream data
const stream = fileManager.streamFileData('./large-file.json');
```

### Database Backup

```javascript
const { backupDatabase } = require('./utils/dataManager');

// Create backup
const backupFile = await backupDatabase(User, Recipe, MealPlan);
```

## 🔐 Security Features

- **JWT Authentication**: Token-based secure authentication
- **Password Hashing**: Bcrypt encryption with configurable rounds
- **CORS**: Cross-origin request control
- **Session Management**: Secure session handling with cookies
- **Input Validation**: Express-validator for all inputs
- **Error Handling**: Comprehensive error logging
- **Data Compression**: Gzip compression for file storage

## 🚀 Deployment

### Heroku Deployment

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Docker Deployment

```bash
docker build -t recipe-server .
docker run -p 5000:5000 --env-file .env recipe-server
```

## 📝 License

MIT

## 👨‍💻 Author

Kundan Kumar - [GitHub](https://github.com/kundankumar9931)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, open an issue on GitHub or contact the maintainers.

---

**Last Updated**: December 2024
