const Recipe = require("../models/Recipe");
const path = require("path");

/* =================================
   CREATE RECIPE
================================= */

exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      cuisine,
      cookTime,
      calories,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title & description required",
      });
    }

    /* ---- Parse Ingredients ---- */
    let parsedIngredients = [];
    try {
      parsedIngredients = ingredients
        ? JSON.parse(ingredients)
        : [];
    } catch {
      parsedIngredients = ingredients
        ? ingredients.split(",").map(i => i.trim())
        : [];
    }

    /* ---- Parse Steps ---- */
    let parsedSteps = [];
    try {
      parsedSteps = steps ? JSON.parse(steps) : [];
    } catch {
      parsedSteps = steps
        ? steps.split(",").map(s => s.trim())
        : [];
    }

    /* ✅ IMAGE FIX (KEY CHANGE) */
    const image = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  : null;


    const recipe = await Recipe.create({
      title,
      description,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      cuisine,
      cookTime,
      calories,
      image,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: recipe,
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* =================================
   GET ALL (Netflix Feed)
================================= */

exports.getAllRecipes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 12;

    const recipes = await Recipe.find()
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Recipe.countDocuments();

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      data: recipes,
    });

  } catch (err) {
    res.status(500).json({ message: "Fetch error" });
  }
};

/* =================================
   SMART SEARCH
================================= */

exports.searchRecipes = async (req, res) => {
  try {
    const { q, cuisine, maxCalories } = req.query;

    let filter = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (cuisine) {
      filter.cuisine = cuisine;
    }

    if (maxCalories) {
      filter.calories = { $lte: Number(maxCalories) };
    }

    const recipes = await Recipe.find(filter)
      .limit(20)
      .populate("author", "name");

    res.json({ success: true, data: recipes });

  } catch (err) {
    res.status(500).json({ message: "Search error" });
  }
};

/* =================================
   GET SINGLE + VIEW TRACKING
================================= */

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "name");

    if (!recipe)
      return res.status(404).json({ message: "Not found" });

    recipe.views += 1;
    await recipe.save();

    res.json({ success: true, data: recipe });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

/* =================================
   LIKE
================================= */

exports.likeRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe.likes.includes(req.user.id)) {
    recipe.likes.push(req.user.id);
    await recipe.save();
  }

  res.json({ likes: recipe.likes.length });
};

/* =================================
   SAVE
================================= */

exports.saveRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe.saves.includes(req.user.id)) {
    recipe.saves.push(req.user.id);
    await recipe.save();
  }

  res.json({ success: true });
};

/* =================================
   COMMENT
================================= */

exports.commentRecipe = async (req, res) => {
  const { text } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  recipe.comments.push({
    user: req.user.id,
    text,
  });

  await recipe.save();

  res.json({ success: true });
};

/* =================================
   RATE
================================= */

exports.rateRecipe = async (req, res) => {
  const { rating } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  recipe.ratingsCount += 1;
  recipe.rating =
    (recipe.rating + rating) / recipe.ratingsCount;

  await recipe.save();

  res.json({ success: true, rating: recipe.rating });
};

/* =================================
   DELETE
================================= */

exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await recipe.deleteOne();

  res.json({ success: true });
};
