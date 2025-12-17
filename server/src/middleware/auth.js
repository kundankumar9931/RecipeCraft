const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');

// Middleware to verify JWT token
exports.authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpire });
};
