import React, { useState } from "react";
import "./RecipesDetails.css";

function RecipesDetails({ recipe, close }) {
  const [tab, setTab] = useState("recipe");

  return (
    <div className="overlay">
      <div className="detail-box">
        <button className="close-btn" onClick={close}>✖</button>

        <div className="detail-header">
          <img src={recipe.image} alt={recipe.title} />
          <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.time} • {recipe.calories} • {recipe.servings}</p>
            <p>{recipe.information}</p>
          </div>
        </div>

        <div className="tabs">
          <button onClick={() => setTab("recipe")}>Recipe</button>
          <button onClick={() => setTab("nutrition")}>Nutrition</button>
          <button onClick={() => setTab("sub")}>Substitutions</button>
        </div>

        {tab === "recipe" && (
          <>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>

            <h3>Directions</h3>
            <ol>
              {recipe.directions.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ol>
          </>
        )}

        {tab === "nutrition" && <p>{recipe.nutrition}</p>}
        {tab === "sub" && <p>{recipe.substitutions}</p>}
      </div>
    </div>
  );
}

export default RecipesDetails;
