
import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
  try {
    console.log("🔍 [GET] /api/recipes - Fetching recipes"); // ✅ Log route hit

    const recipes = await Recipe.find({});
    console.log("✅ Recipes found:", recipes); // ✅ Log fetched recipes

    res.json(recipes);
  } catch (error) {
    console.error("❌ Error in getRecipes:", error.message); // ✅ Log error
    res.status(500).json({ message: error.message });
  }
};

export const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;
  console.log("📥 Incoming Recipe Data:", req.body); // ✅ Log posted data

  try {
    const recipe = new Recipe({ title, ingredients, instructions, image });
    const savedRecipe = await recipe.save();
    console.log("✅ Recipe saved:", savedRecipe); // ✅ Log saved recipe
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("❌ Error in addRecipe:", error.message); // ✅ Log error
    res.status(400).json({ message: error.message });
  }
};
