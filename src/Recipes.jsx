// import React, { useState } from "react";
// import RecipesDetails from "./RecipesDetails";


// import "./Recipes.css";

// const recipes = [

//     {
//         id: 1,
//         title: "Alloo Paratha",
//         image: "https://tse3.mm.bing.net/th/id/OIP.oN0Oj4PAmObSlRlqVOmSVAHaKA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
//         time: "25 min",
//         calories: "350 cal",
//         servings: "2 servings",
//         information: "Aloo Paratha is a popular Indian flatbread stuffed with a spiced potato filling. It is typically served with yogurt, pickles, or butter, making it a hearty and satisfying meal for breakfast or any time of the day.",
//         ingredients: [

//             "2 cups Whole Wheat Flour",
//             "3 medium Potatoes (boiled and mashed)",
//             "1 Green Chili (finely chopped)",
//             "1 tsp Cumin Seeds",
//             "1 tsp Garam Masala",
//             "1 tsp Red Chili Powder",
//             "1 tsp Amchur (Dry Mango Powder)",
//             "Salt to taste",
//             "Water (as needed)",
//             "Ghee or Oil (for cooking)"
//         ],
//         directions: [
//             "Prepare dough with flour and water.",
//             "Mix potato filling with spices.",
//             "Roll out dough, stuff with filling, and seal.",
//             "Cook on a hot griddle with ghee/oil until golden brown."
//         ],
//         nutrition: "Rich in carbohydrates and fiber",
//         substitutions: "Use gluten-free flour for gluten intolerance"
//     },
//     {
//     id: 2,
//     title: "Rajma Chawal",
//     image: "https://tse2.mm.bing.net/th/id/OIP.09-sfInKRgM6joO2RknNZQHaFq?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
//     time: "45 min",
//     calories: "450 cal",
//     servings: "3 servings",
//     information: "Rajma Chawal is a classic North Indian dish consisting of red kidney beans cooked in a flavorful tomato-based gravy, served with steamed rice. It's a comforting and hearty meal, perfect for any occasion.",
//     ingredients: [
//         "1 cup Red Kidney Beans (soaked overnight)",
//         "2 cups Basmati Rice",
//         "2 Onions (finely chopped)",
//         "2 Tomatoes (pureed)",
//         "1 tbsp Ginger-Garlic Paste",
//         "2 tsp Cumin Seeds",
//         "1 tsp Turmeric Powder",
//         "1 tsp Red Chili Powder",
//         "1 tsp Garam Masala",
//         "Salt to taste",
//         "Fresh Coriander Leaves (for garnish)",
//         "Oil"
//     ],
//     directions: [
//         "Cook soaked kidney beans until soft.",
//         "Prepare rice separately and keep aside.",
//         "In a pan, heat oil and add cumin seeds.",
//         "Add onions and sauté until golden brown.",
//         "Add ginger-garlic paste and cook for a minute.",
//         "Add tomato puree and spices; cook until oil separates.",
//         "Add cooked kidney beans to the gravy and simmer for 10-15 minutes.",
//         "Serve hot with steamed rice and garnish with coriander leaves."
//     ],
//     nutrition: "High in protein and fiber",
//     substitutions: "Use chickpeas for a different variation"
//     },
//   {
//     id: 3,
//     title: "Vegetable Stir Fry",
//     image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
//     time: "17 min",
//     calories: "304 cal",
//     servings: "4 servings",
//     information: "A quick and easy vegetable stir fry recipe that's perfect for a healthy weeknight dinner. Packed with colorful veggies and a savory sauce, this dish is both delicious and nutritious.",
//     ingredients: [
//       "250g Egg Noodles",
//       "1 tbsp Tomato Puree",
//       "2 tbsp Soy Sauce",
//       "2 tbsp Sweet Chilli Sauce",
//       "300g Stir Fry Vegetables",
//       "Ginger (grated)"
//     ],
//     directions: [
//       "Boil noodles and drain.",
//       "Heat oil in pan and add ginger.",
//       "Add vegetables and stir fry.",
//       "Add sauces and noodles.",
//       "Mix well and serve hot."
//     ],
//     nutrition: "High fiber, rich in vitamins",
//     substitutions: "Use rice noodles instead of egg noodles"
//   },

//   {
//     id: 4,
//     title: "Paneer Butter Masala",
//     image: "https://th.bing.com/th/id/R.aed83171188e6cf134726393a09912ff?rik=cglulDUn%2f4BGhw&riu=http%3a%2f%2ffarm8.staticflickr.com%2f7167%2f6498477017_848c40ca57_o.jpg&ehk=GdL%2bq%2fyY1ilRDOWSHtU7MAUrq%2b%2fYo%2fTxiC%2b6WFoHfBQ%3d&risl=&pid=ImgRaw&r=0",
//     time: "30 min",
//     calories: "420 cal",
//     servings: "3 servings",
//     information: "Matar paneer is a delicious dish made by cooking paneer & green peas in spicy onion tomato masala. This recipe will give you restaurant style creamy & rich matar paneer. It tastes amazing to serve with rice, naan or paratha. Stovetop and instant pot ...",
//     ingredients: [
//       "200g Paneer",
//       "Onion",
//       "Tomato",
//       "Butter",
//       "Cream",
//       "Spices"
//     ],
//     directions: [
//       "Fry paneer cubes.",
//       "Prepare tomato gravy.",
//       "Add butter and spices.",
//       "Add paneer and cook.",
//       "Finish with cream."
//     ],
//     nutrition: "Protein rich",
//     substitutions: "Use tofu instead of paneer"
//   },

//   {
//     id: 5,
//     title: "Chicken Curry",
//     image: "https://feastwithsafiya.com/wp-content/uploads/2022/03/chicken-curry-recipe.jpg",
//     time: "40 min",
//     calories: "480 cal",
//     servings: "4 servings",
//     information: "This chicken curry recipe is a flavorful and aromatic dish made with tender chicken pieces simmered in a rich blend of spices, tomatoes, and onions. Perfect for serving with rice or naan, this curry is a comforting meal that brings warmth to any table.",
//     ingredients: [
//       "Chicken",
//       "Onion",
//       "Tomato",
//       "Spices",
//       "Oil"
//     ],
//     directions: [
//       "Saute onions.",
//       "Add chicken and spices.",
//       "Add tomatoes and cook.",
//       "Simmer until done."
//     ],
//     nutrition: "High protein",
//     substitutions: "Use mushrooms for veg version"
//   },

//   {
//     id: 6,
//     title: "Fruit Salad",
//     image: "https://www.wellplated.com/wp-content/uploads/2021/05/Delicious-Fruit-Salad.jpg",
//     time: "10 min",
//     calories: "180 cal",
//     servings: "2 servings",
//     information: "A refreshing and healthy fruit salad made with a mix of fresh fruits, perfect for a quick snack or dessert. This colorful salad is not only delicious but also packed with vitamins and nutrients.",
//     ingredients: [
//       "Apple",
//       "Banana",
//       "Orange",
//       "Honey"
//     ],
//     directions: [
//       "Chop fruits.",
//       "Mix in bowl.",
//       "Add honey and serve."
//     ],
//     nutrition: "Rich in vitamins",
//     substitutions: "Skip honey for vegan"
//   },

//   {
//     id: 7,
//     title: "Vegetable Soup",
//     image: "https://natashaskitchen.com/wp-content/uploads/2021/05/Vegetable-Soup-4-1024x1536.jpg",
//     time: "25 min",
//     calories: "220 cal",
//     servings: "3 servings",
//     information: "A hearty and nutritious vegetable soup made with a variety of fresh vegetables, perfect for a comforting meal. This soup is easy to prepare and can be customized with your favorite veggies.",
//     ingredients: [
//       "Mixed vegetables",
//       "Garlic",
//       "Salt",
//       "Pepper"
//     ],
//     directions: [
//       "Boil vegetables.",
//       "Blend slightly.",
//       "Season and serve."
//     ],
//     nutrition: "Low calorie",
//     substitutions: "Add cream for richness"
//   },
//   {
//     id: 8,
//     title: "Pasta Primavera",
//     image: "https://www.cookingclassy.com/wp-content/uploads/2018/09/pasta-primavera-2.jpg",
//     time: "20 min", 
//     calories: "350 cal",
//     servings: "4 servings",
//     information: "A light and fresh pasta dish loaded with seasonal vegetables, tossed in a garlic and olive oil sauce. Perfect for a quick and healthy meal that's full of flavor.",       
//     ingredients: [
//         "Pasta",
//         "Bell Peppers",       
//         "Zucchini", 
//         "Cherry Tomatoes",
//         "Olive Oil",
//         "Garlic"
//     ],
//     directions: [
//         "Cook pasta.",
//         "Sauté vegetables.",
//         "Toss pasta with vegetables and sauce.",
//         "Serve warm."
//     ],
//     nutrition: "Rich in fiber and vitamins",
//     substitutions: "Use gluten-free pasta if needed"

//   },
//   {
//     id: 9,
//     title: "Chicken Biryani",
//     image: "https://tse3.mm.bing.net/th/id/OIP.R7EtnlIcZJw1EoFSymzAugHaLG?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
//     time: "60 min",
//     calories: "600 cal",
//     servings: "5 servings",
//     information: "A flavorful and aromatic chicken biryani made with basmati rice, tender chicken pieces, and a blend of spices. This classic Indian dish is perfect for special occasions and family gatherings.",
//     ingredients: [
//         "Basmati Rice",
//         "Chicken",
//         "Yogurt",
//         "Spices",
//         "Onion"
//     ],
//     directions: [
//         "Marinate chicken.",
//         "Cook rice partially.",
//         "Layer chicken and rice.",
//         "Cook on low heat until done."
//     ],
//     nutrition: "High protein and carbs",
//     substitutions: "Use vegetables for veg biryani"

//   }
// ];

// function Recipes() {

//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [search, setSearch] = useState("");
//   const [apiRecipes, setApiRecipes] = useState([]);
//   const searchFromAPI = async (query) => {
//   if (!query) {
//     setApiRecipes([]);
//     return;
//   }

//   try {
//     const res = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
//     );
//     const data = await res.json();

//     if (data.meals) {
//       const formatted = data.meals.map((meal) => ({
//         id: meal.idMeal,
//         title: meal.strMeal,
//         image: meal.strMealThumb,
//         time: "N/A",
//         calories: "N/A",
//         servings: "N/A",
//         information: meal.strInstructions,
//         ingredients: Object.keys(meal)
//           .filter(
//             (key) => key.startsWith("strIngredient") && meal[key]
//           )
//           .map((key) => meal[key]),
//         directions: ["Follow instructions above"],
//         nutrition: "Not available",
//         substitutions: "Not available",
//       }));

//       setApiRecipes(formatted);
//     } else {
//       setApiRecipes([]);
//     }
//   } catch (error) {
//     console.error("API error", error);
//     setApiRecipes([]);
//   }
// };


//   // 🔍 SEARCH FILTER LOGIC
//   // const filteredRecipes = recipes.filter((recipe) =>
//   //   recipe.title.toLowerCase().includes(search.toLowerCase()) ||
//   //   recipe.ingredients.some((item) =>
//   //     item.toLowerCase().includes(search.toLowerCase())
//   //   )
//   // );/
//   const filteredRecipes = [
//   ...recipes.filter(
//     (recipe) =>
//       recipe.title.toLowerCase().includes(search.toLowerCase()) ||
//       recipe.ingredients.some((item) =>
//         item.toLowerCase().includes(search.toLowerCase())
//       )
//   ),
//   ...apiRecipes,
// ];


//   return (
//     <div className="recipes-container">
//       <h1>Recipes</h1>

//       {/* 🔍 SEARCH BAR */}
//       <input
//         type="text"
//         className="recipe-search"
//         placeholder="Search recipes by name or ingredient..."
//         value={search}
//         onChange={(e) => {
//   setSearch(e.target.value);
//   searchFromAPI(e.target.value);
// }}

//       />

//       <div className="recipe-grid">
//         {filteredRecipes.length === 0 && (
//           <p style={{ color: "#555" }}>No recipes found</p>
//         )}

//         {filteredRecipes.map((recipe) => (
//           <div
//             key={recipe.id}
//             className="recipe-card"
//             onClick={() => setSelectedRecipe(recipe)}
//           >
//             <img src={recipe.image} alt={recipe.title} />
//             <h3>{recipe.title}</h3>
//           </div>
//         ))}
//       </div>

//       {selectedRecipe && (
//         <RecipesDetails
//           recipe={selectedRecipe}
//           close={() => setSelectedRecipe(null)}
//         />
//       )}
//     </div>
//   );
// }
// export default Recipes;

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
