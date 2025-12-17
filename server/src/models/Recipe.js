const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide recipe title'],
      unique: true,
      trim: true,
    },
    description: String,
    image: String,
    cookTime: String,
    prepTime: String,
    totalTime: String,
    servings: String,
    calories: Number,
    ingredients: [
      {
        item: String,
        quantity: String,
        unit: String,
      },
    ],
    directions: [String],
    nutrition: {
      protein: Number,
      carbs: Number,
      fats: Number,
      fiber: Number,
    },
    dietaryTags: {
      type: [String],
      enum: ['vegetarian', 'vegan', 'gluten-free', 'keto', 'paleo', 'dairy-free'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

module.exports = mongoose.model('Recipe', recipeSchema);
