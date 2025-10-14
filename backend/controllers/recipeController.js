const Recipe = require('../models/Recipe');
const path = require('path');

exports.createRecipe = async (req, res) => {
  try {
    console.log("➡️ Incoming Recipe Request");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const { title, description, ingredients, steps } = req.body;

    // ✅ Parse safely (avoid crashing on invalid JSON)
    let parsedIngredients = [];
    let parsedSteps = [];

    try {
      parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
    } catch {
      parsedIngredients = ingredients ? ingredients.split(',').map(i => i.trim()) : [];
    }

    try {
      parsedSteps = steps ? JSON.parse(steps) : [];
    } catch {
      parsedSteps = steps ? steps.split(',').map(s => s.trim()) : [];
    }

    // ✅ Fix image path to store clean relative path in MongoDB
    // Converts "C:/dishcovery/backend/uploads/123.png" → "uploads/123.png"
    const image = req.file
      ? `uploads/${path.basename(req.file.path)}`
      : null;

    // ✅ Handle missing user (in case auth fails)
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: 'Unauthorized. Token missing or invalid.' });
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      image,
      author: req.user._id,
    });

    await recipe.save();
    console.log("✅ Recipe saved successfully:", recipe._id);
    res.status(201).json(recipe);
  } catch (err) {
    console.error("❌ Error creating recipe:", err);
    res
      .status(500)
      .json({
        message: 'Server error while creating recipe',
        error: err.message,
      });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'name');
    res.json(recipes);
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    res
      .status(500)
      .json({ message: 'Error fetching recipes', error: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name');
    if (!recipe)
      return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    console.error("❌ Error fetching recipe:", err);
    res
      .status(500)
      .json({ message: 'Error fetching recipe', error: err.message });
  }
};
