const express = require('express');
const { body } = require('express-validator');
const recipeController = require('../controllers/recipeController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all recipes (public)
router.get('/', recipeController.getAllRecipes);

// Get recipe by ID (public)
router.get('/:id', recipeController.getRecipeById);

// Search by ingredients (public)
router.get('/search/ingredients', recipeController.searchByIngredients);

// Create recipe (protected)
router.post(
  '/',
  authMiddleware,
  [
    body('title', 'Title is required').trim().notEmpty(),
    body('ingredients', 'Ingredients are required').isArray({ min: 1 }),
    body('directions', 'Directions are required').isArray({ min: 1 }),
  ],
  recipeController.createRecipe
);

// Update recipe (protected)
router.put('/:id', authMiddleware, recipeController.updateRecipe);

// Delete recipe (protected)
router.delete('/:id', authMiddleware, recipeController.deleteRecipe);

// Add review (protected)
router.post('/:id/reviews', authMiddleware, recipeController.addReview);

module.exports = router;
