const fs = require('fs');
const path = require('path');

/**
 * Backup database to JSON file
 * Uses fs module to write database snapshots
 */
async function backupDatabase(User, Recipe, MealPlan) {
  try {
    const backupDir = path.join(__dirname, '../../backups');
    
    // Create backup directory if not exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

    // Fetch all data
    const users = await User.find({});
    const recipes = await Recipe.find({});
    const mealPlans = await MealPlan.find({});

    const backupData = {
      timestamp: new Date(),
      users: users.length,
      recipes: recipes.length,
      mealPlans: mealPlans.length,
      data: {
        users,
        recipes,
        mealPlans,
      },
    };

    // Write to file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`Database backup created: ${backupFile}`);
    
    return backupFile;
  } catch (error) {
    console.error('Error backing up database:', error);
    throw error;
  }
}

/**
 * Get database statistics
 */
async function getDatabaseStats(User, Recipe, MealPlan) {
  try {
    const stats = {
      users: await User.countDocuments(),
      recipes: await Recipe.countDocuments(),
      mealPlans: await MealPlan.countDocuments(),
      timestamp: new Date(),
    };

    return stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
}

module.exports = {
  backupDatabase,
  getDatabaseStats,
};
