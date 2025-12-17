require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-planner',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
  sessionSecret: process.env.SESSION_SECRET || 'your_session_secret_key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
