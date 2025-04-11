import React, { useState, useEffect } from "react";
import "../styles/likedProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/likedRecipes"
      );

      if (!response.ok) {
        toast.error("Failed to fetch liked products");
      }

      const data = await response.json();
      setLikedProducts(data);
    } catch (error) {
      toast.error("Error fetching liked products");
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to remove this recipe?")) {
        const response = await fetch(
          `http://localhost:5000/api/removeLiked/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Item removed successfully");
          fetchLikedProducts();
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  return (
    <div className="liked-recipes">
      <h2>❤️ Your Favourite Recipes</h2>
      <div className="recipe-list">
        {likedProducts.map((product) => (
          <div key={product._id} className="recipe-card">
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div>
              <strong>Ingredients:</strong>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Instructions:</strong>
              {product.instructions.split("\n").map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
            <button onClick={() => handleRemoveItem(product._id)}>
              Remove Recipe
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
