import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://flavorly-backend.onrender.com/api/recipe");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes-container">
      <h2>Delicious Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
