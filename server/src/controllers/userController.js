const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');

// @desc Register user
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dietaryPreferences: user.dietaryPreferences,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favoriteRecipes')
      .populate('mealPlans');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, dietaryPreferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, dietaryPreferences },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Logout user
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc Add recipe to favorites
exports.addFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { favoriteRecipes: recipeId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Recipe added to favorites',
      favoriteRecipes: user.favoriteRecipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Remove recipe from favorites
exports.removeFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { favoriteRecipes: recipeId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites',
      favoriteRecipes: user.favoriteRecipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Add item to shopping list
exports.addToShoppingList = async (req, res, next) => {
  try {
    const { item, quantity } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          shoppingList: { item, quantity, purchased: false },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Item added to shopping list',
      shoppingList: user.shoppingList,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update shopping list item
exports.updateShoppingListItem = async (req, res, next) => {
  try {
    const { itemId, purchased } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          'shoppingList.$[elem].purchased': purchased,
        },
      },
      {
        arrayFilters: [{ 'elem._id': itemId }],
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Shopping list item updated',
      shoppingList: user.shoppingList,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Clear shopping list
exports.clearShoppingList = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { shoppingList: [] },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Shopping list cleared',
    });
  } catch (error) {
    next(error);
  }
};
