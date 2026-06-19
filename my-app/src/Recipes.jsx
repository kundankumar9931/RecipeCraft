import React, { useState } from "react";
import RecipesDetails from "./RecipesDetails";
import "./Recipes.css";

/* Local recipes */
const recipes = [
  {
    id: 1,
    title: "Alloo Paratha",
    image: "https://tse3.mm.bing.net/th/id/OIP.oN0Oj4PAmObSlRlqVOmSVAHaKA",
    time: "25 min",
    calories: "350 cal",
    servings: "2 servings",
    information: "Popular Indian stuffed flatbread.",
    ingredients: ["Potato", "Flour", "Spices"],
    directions: ["Prepare dough", "Add filling", "Cook"],
    nutrition: "High carbs",
    substitutions: "Gluten-free flour",
  },
  {
    id: 2,
    title: "Rajma Chawal",
    image: "https://tse2.mm.bing.net/th/id/OIP.09-sfInKRgM6joO2RknNZQ",
    time: "45 min",
    calories: "450 cal",
    servings: "3 servings",
    information: "Classic North Indian dish.",
    ingredients: ["Rajma", "Rice", "Tomato", "Spices"],
    directions: ["Cook rajma", "Prepare gravy", "Serve with rice"],
    nutrition: "High protein",
    substitutions: "Use chickpeas",
  },
];

function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [apiRecipes, setApiRecipes] = useState([]);

  /* API SEARCH */
  const searchFromAPI = async (query) => {
    if (!query) {
      setApiRecipes([]);
      return;
    }

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (data.meals) {
        const formatted = data.meals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          time: "N/A",
          calories: "N/A",
          servings: "N/A",
          information: meal.strInstructions,
          ingredients: Object.keys(meal)
            .filter(
              (key) => key.startsWith("strIngredient") && meal[key]
            )
            .map((key) => meal[key]),
          directions: ["Follow instructions above"],
          nutrition: "Not available",
          substitutions: "Not available",
        }));

        setApiRecipes(formatted);
      } else {
        setApiRecipes([]);
      }
    } catch (err) {
      console.error(err);
      setApiRecipes([]);
    }
  };

  /* COMBINED SEARCH */
  const filteredRecipes = [
    ...recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
    ),
    ...apiRecipes,
  ];

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="recipe-search"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchFromAPI(e.target.value);
        }}
      />

      <div className="recipe-grid">
        {filteredRecipes.length === 0 && (
          <p>No recipes found</p>
        )}

        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipesDetails
          recipe={selectedRecipe}
          close={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default Recipes;
