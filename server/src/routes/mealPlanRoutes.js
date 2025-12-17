const express = require('express');
const mealPlanController = require('../controllers/mealPlanController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all meal plans for user (protected)
router.get('/', authMiddleware, mealPlanController.getUserMealPlans);

// Get meal plan by ID (protected)
router.get('/:id', authMiddleware, mealPlanController.getMealPlanById);

// Create meal plan (protected)
router.post('/', authMiddleware, mealPlanController.createMealPlan);

// Update meal plan (protected)
router.put('/:id', authMiddleware, mealPlanController.updateMealPlan);

// Delete meal plan (protected)
router.delete('/:id', authMiddleware, mealPlanController.deleteMealPlan);

// Add meal to plan (protected)
router.post('/:id/meals', authMiddleware, mealPlanController.addMealToPlan);

// Remove meal from plan (protected)
router.delete('/:id/meals', authMiddleware, mealPlanController.removeMealFromPlan);

module.exports = router;
