const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    weekEnd: {
      type: Date,
      required: true,
    },
    meals: [
      {
        date: Date,
        mealType: {
          type: String,
          enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        },
        recipe: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Recipe',
        },
        servings: Number,
        notes: String,
      },
    ],
    totalNutrition: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
