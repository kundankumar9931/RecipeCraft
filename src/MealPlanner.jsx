
import React, { useState, useEffect } from "react";
import "./MealPlanner.css";

const recipes = [];

/* MealDB API Helper Functions */
const fetchMealsBySearchTerm = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals from MealDB:", error);
    return [];
  }
};

const categorizeMealsByType = (meals) => {
  const mealTypeMap = {
    breakfast: ["breakfast", "dessert", "morning", "oat", "cereal", "toast", "egg"],
    lunch: ["lunch", "salad", "sandwich", "noodle", "pasta", "rice bowl"],
    dinner: ["dinner", "steak", "salmon", "chicken", "curry", "roast", "grilled"],
  };

  const categorized = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  meals.forEach((meal) => {
    const mealName = meal.strMeal.toLowerCase();
    const category = meal.strCategory.toLowerCase();

    let assigned = false;
    for (const [type, keywords] of Object.entries(mealTypeMap)) {
      if (keywords.some((keyword) => mealName.includes(keyword) || category.includes(keyword))) {
        categorized[type].push(meal);
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      categorized.lunch.push(meal);
    }
  });

  return categorized;
};

const extractNutritionFromMeal = (meal) => {
  const estimatedCalories = Math.floor(Math.random() * 400 + 200);
  const estimatedProtein = Math.floor(Math.random() * 30 + 15);
  const estimatedCarbs = Math.floor(Math.random() * 40 + 25);
  const estimatedFats = Math.floor(Math.random() * 15 + 8);

  return {
    name: meal.strMeal,
    calories: estimatedCalories,
    protein: estimatedProtein,
    carbs: estimatedCarbs,
    fats: estimatedFats,
    image: meal.strMealThumb,
    category: meal.strCategory,
    tags: meal.strTags || "",
    id: meal.idMeal,
    source: "mealdb",
  };
};

const meals = ["Breakfast", "Lunch", "Dinner"];

const getWeekDates = (offset = 0) => {
  const start = new Date();
  start.setDate(start.getDate() - start.getDay() + 1 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

function MealPlanner() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [plan, setPlan] = useState(JSON.parse(localStorage.getItem("mealCalendar")) || {});
  const [searchModal, setSearchModal] = useState({ open: false, dateKey: null, meal: null });
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categorizedResults, setCategorizedResults] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [useExternal, setUseExternal] = useState(false);

  const weekDates = getWeekDates(weekOffset);

  useEffect(() => {
    localStorage.setItem("mealCalendar", JSON.stringify(plan));
  }, [plan]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setSearchLoading(true);
    setUseExternal(true);

    try {
      const meals = await fetchMealsBySearchTerm(query);
      const categorized = categorizeMealsByType(meals);
      const enrichedMeals = meals.map(extractNutritionFromMeal);

      setSearchResults(enrichedMeals);
      setCategorizedResults(categorized);
    } catch {
      setSearchResults([]);
      setCategorizedResults({ breakfast: [], lunch: [], dinner: [] });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectFromMealDB = (dateKey, meal, mealData) => {
    const recipeObj = extractNutritionFromMeal(mealData);

    setPlan((prev) => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], [meal]: recipeObj },
    }));

    setSearchModal({ open: false, dateKey: null, meal: null });
    setQuery("");
    setSearchResults([]);
    setCategorizedResults({ breakfast: [], lunch: [], dinner: [] });
    setUseExternal(false);
  };

  const handleRemoveMeal = (dateKey, meal) => {
    setPlan((prev) => {
      const updated = { ...prev };
      if (updated[dateKey]) {
        delete updated[dateKey][meal];
      }
      return updated;
    });
  };

  const calculateTotals = (dayMeals) =>
    Object.values(dayMeals || {}).reduce(
      (t, r) => ({
        calories: t.calories + r.calories,
        protein: t.protein + r.protein,
        carbs: t.carbs + r.carbs,
        fats: t.fats + r.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

  const shoppingList = (() => {
    const seen = new Set();
    const items = [];
    for (const date of weekDates) {
      const key = date.toISOString().split("T")[0];
      const day = plan[key];
      if (!day) continue;
      for (const m of meals) {
        const r = day[m];
        if (r && r.name && !seen.has(r.name)) {
          seen.add(r.name);
          items.push(r.name);
        }
      }
    }
    return items;
  })();

  return (
    <div className="nutrition-planner">

      <div className="planner-header">
        <h1>Meal Planner Calendar</h1>
        <p>Plan your weekly meals with nutrition tracking</p>
      </div>

      <div className="calendar-controls">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>◀ Prev</button>
        <span>Week of {weekDates[0].toDateString()}</span>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>Next ▶</button>
      </div>

      <div className="planner-grid">
        {weekDates.map((date) => {
          const key = date.toISOString().split("T")[0];
          const totals = calculateTotals(plan[key]);

          return (
            <div key={key} className="day-card">
              <h3>{date.toLocaleDateString("en-US", { weekday: "short" })}</h3>
              <p className="date">
                {date.getDate()} {date.toLocaleString("default", { month: "short" })}
              </p>

              {meals.map((meal) => {
                const mealSelected = plan[key] && plan[key][meal];
                const mealName = mealSelected ? mealSelected.name : null;

                return (
                  <div key={meal} className="meal-slot">
                    <div className="meal-name">{mealName || meal}</div>
                    <div className="meal-buttons">
                      <button onClick={() => setSearchModal({ open: true, dateKey: key, meal })}>
                        {mealName ? "Change" : "+ Search Meal"}
                      </button>

                      {mealName && (
                        <button onClick={() => handleRemoveMeal(key, meal)}>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="nutrition-box">
                <strong>{totals.calories} kcal</strong>
                <p>P:{totals.protein}g | C:{totals.carbs}g | F:{totals.fats}g</p>
              </div>
            </div>
          );
        })}
      </div>

      {searchModal.open && (
        <div className="overlay">
          <div className="detail-box">

            <button
              className="close-btn"
              onClick={() => {
                setSearchModal({ open: false, dateKey: null, meal: null });
                setQuery("");
                setSearchResults([]);
                setUseExternal(false);
              }}
            >
              ✖
            </button>

            <h3>Search Meals from TheMealDB</h3>

            <div className="search-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search meals (e.g., Pasta, Chicken...)"
              />
              <button onClick={handleSearch}>
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {useExternal && searchResults.length > 0 && (
              <div className="results-box">
                {["breakfast", "lunch", "dinner"].map((mealType) => {
                  const mealsInCategory = categorizedResults[mealType] || [];
                  if (mealsInCategory.length === 0) return null;

                  return (
                    <div key={mealType} className="meal-section">
                      <h4>
                        {mealType.toUpperCase()} ({mealsInCategory.length})
                      </h4>

                      <div className="meal-grid">
                        {mealsInCategory.map((meal) => {
                          const nutrition = extractNutritionFromMeal(meal);
                          return (
                            <div key={meal.idMeal} className="meal-card">
                              <img src={meal.strMealThumb} alt={meal.strMeal} />
                              <strong>{meal.strMeal}</strong>

                              <button
                                onClick={() =>
                                  handleSelectFromMealDB(
                                    searchModal.dateKey,
                                    searchModal.meal,
                                    meal
                                  )
                                }
                              >
                                Add to {searchModal.meal}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="summary-card">
        <h2>🛒 Shopping List</h2>
        {shoppingList.length === 0 ? <p className="empty">No items yet</p> : (
          <ul>
            {shoppingList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MealPlanner;

