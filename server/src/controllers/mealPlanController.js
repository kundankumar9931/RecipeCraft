const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

// @desc Get all meal plans for user
exports.getUserMealPlans = async (req, res, next) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.userId })
      .populate('meals.recipe')
      .sort({ weekStart: -1 });

    res.status(200).json({
      success: true,
      count: mealPlans.length,
      mealPlans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get meal plan by ID
exports.getMealPlanById = async (req, res, next) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id).populate('meals.recipe');

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Check ownership
    if (mealPlan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this meal plan' });
    }

    res.status(200).json({
      success: true,
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create meal plan
exports.createMealPlan = async (req, res, next) => {
  try {
    const { weekStart, weekEnd, meals } = req.body;

    const mealPlan = await MealPlan.create({
      userId: req.userId,
      weekStart,
      weekEnd,
      meals,
    });

    // Calculate total nutrition
    const populatedPlan = await mealPlan.populate('meals.recipe');
    const totalNutrition = populatedPlan.meals.reduce(
      (total, meal) => {
        if (meal.recipe) {
          return {
            calories: total.calories + (meal.recipe.nutrition?.calories || 0),
            protein: total.protein + (meal.recipe.nutrition?.protein || 0),
            carbs: total.carbs + (meal.recipe.nutrition?.carbs || 0),
            fats: total.fats + (meal.recipe.nutrition?.fats || 0),
          };
        }
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    mealPlan.totalNutrition = totalNutrition;
    await mealPlan.save();

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update meal plan
exports.updateMealPlan = async (req, res, next) => {
  try {
    let mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    if (mealPlan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this meal plan' });
    }

    mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('meals.recipe');

    // Recalculate total nutrition
    const totalNutrition = mealPlan.meals.reduce(
      (total, meal) => {
        if (meal.recipe) {
          return {
            calories: total.calories + (meal.recipe.nutrition?.calories || 0),
            protein: total.protein + (meal.recipe.nutrition?.protein || 0),
            carbs: total.carbs + (meal.recipe.nutrition?.carbs || 0),
            fats: total.fats + (meal.recipe.nutrition?.fats || 0),
          };
        }
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    mealPlan.totalNutrition = totalNutrition;
    await mealPlan.save();

    res.status(200).json({
      success: true,
      message: 'Meal plan updated successfully',
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete meal plan
exports.deleteMealPlan = async (req, res, next) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    if (mealPlan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this meal plan' });
    }

    await MealPlan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Meal plan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Add meal to plan
exports.addMealToPlan = async (req, res, next) => {
  try {
    const { date, mealType, recipeId, servings, notes } = req.body;

    const mealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          meals: {
            date,
            mealType,
            recipe: recipeId,
            servings,
            notes,
          },
        },
      },
      { new: true }
    ).populate('meals.recipe');

    res.status(200).json({
      success: true,
      message: 'Meal added to plan',
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Remove meal from plan
exports.removeMealFromPlan = async (req, res, next) => {
  try {
    const { mealId } = req.body;

    const mealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          meals: { _id: mealId },
        },
      },
      { new: true }
    ).populate('meals.recipe');

    res.status(200).json({
      success: true,
      message: 'Meal removed from plan',
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};
