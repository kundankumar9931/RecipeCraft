const { validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');

// @desc Get all recipes
exports.getAllRecipes = async (req, res, next) => {
  try {
    const { dietaryTags, difficulty, search, page = 1, limit = 10 } = req.query;

    let query = {};

    if (dietaryTags) {
      query.dietaryTags = { $in: dietaryTags.split(',') };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const recipes = await Recipe.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('reviews.userId', 'name email');

    const total = await Recipe.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit)),
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get recipe by ID
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      'reviews.userId',
      'name email'
    );

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create recipe
exports.createRecipe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recipe = await Recipe.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update recipe
exports.updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this recipe' });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete recipe
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Search recipes by ingredients
exports.searchByIngredients = async (req, res, next) => {
  try {
    const { ingredients } = req.query;

    if (!ingredients) {
      return res.status(400).json({ message: 'Please provide ingredients' });
    }

    const ingredientArray = ingredients.split(',').map((i) => i.trim());

    const recipes = await Recipe.find({
      'ingredients.item': { $in: ingredientArray },
    }).select('title image ingredients servings calories');

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Add review to recipe
exports.addReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            userId: req.userId,
            comment,
            rating,
          },
        },
      },
      { new: true }
    ).populate('reviews.userId', 'name');

    // Update average rating
    const avgRating =
      recipe.reviews.reduce((sum, review) => sum + review.rating, 0) /
      recipe.reviews.length;
    recipe.rating = avgRating;
    await recipe.save();

    res.status(200).json({
      success: true,
      message: 'Review added successfully',
      recipe,
    });
  } catch (error) {
    next(error);
  }
};
