const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  userController.register
);

// Login route
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  userController.login
);

// Get profile
router.get('/profile', authMiddleware, userController.getProfile);

// Update profile
router.put(
  '/profile',
  authMiddleware,
  [body('name', 'Name is required').optional().trim().notEmpty()],
  userController.updateProfile
);

// Logout
router.post('/logout', userController.logout);

// Favorites
router.post('/favorites/add', authMiddleware, userController.addFavorite);
router.post('/favorites/remove', authMiddleware, userController.removeFavorite);

// Shopping list
router.post('/shopping-list/add', authMiddleware, userController.addToShoppingList);
router.put(
  '/shopping-list/update/:itemId',
  authMiddleware,
  userController.updateShoppingListItem
);
router.delete('/shopping-list/clear', authMiddleware, userController.clearShoppingList);

module.exports = router;
