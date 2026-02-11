const Recipe = require("../models/Recipe");
const User = require("../models/User");

/* =========================================
   AI RECOMMEND BY INGREDIENTS (FIXED)
========================================= */
exports.recommend = async (req, res) => {
  try {
    let { ingredients } = req.body;

    /* ========= FIX START ========= */

    // If string → convert to array
    if (typeof ingredients === "string") {
      ingredients = ingredients
        .split(",")
        .map(i => i.trim().toLowerCase());
    }

    // If not array → make empty array
    if (!Array.isArray(ingredients)) {
      ingredients = [];
    }

    if (ingredients.length === 0) {
      return res.status(400).json({
        message: "Ingredients required",
      });
    }

    /* ========= FIX END ========= */

    const recipes = await Recipe.find({
      ingredients: {
        $in: ingredients.map(i => new RegExp(i, "i")),
      },
    })
      .populate("author", "name")
      .limit(10);

    // Score matches
    const ranked = recipes.map(r => {
      const matchCount = r.ingredients.filter(i =>
        ingredients.some(inp =>
          i.toLowerCase().includes(inp)
        )
      ).length;

      return {
        ...r.toObject(),
        score: matchCount,
      };
    });

    ranked.sort((a, b) => b.score - a.score);

    res.json(ranked);

  } catch (err) {
    console.error("AI recommend error:", err);
    res.status(500).json({ message: "AI error" });
  }
};


/* =========================================
   HEALTHIER SWAPS
========================================= */

exports.healthier = (req, res) => {
  try {
    const swaps = {
      sugar: "honey 🍯",
      butter: "olive oil 🫒",
      cream: "greek yogurt 🥛",
      salt: "herbs 🌿",
      rice: "brown rice 🍚",
    };

    const { ingredients = [] } = req.body;

    const healthier = ingredients.map(i =>
      swaps[i.toLowerCase()] || i
    );

    res.json({
      original: ingredients,
      healthier,
    });

  } catch (err) {
    res.status(500).json({ message: "Health AI error" });
  }
};

/* =========================================
   AUTO STEP GENERATOR
========================================= */

exports.generateSteps = (req, res) => {
  try {
    const { ingredients = [] } = req.body;

    const steps = ingredients.map(
      (i, idx) =>
        `Step ${idx + 1}: Cook ${i} with care 👨‍🍳`
    );

    res.json({ steps });

  } catch (err) {
    res.status(500).json({ message: "Step generation error" });
  }
};

/* =========================================
   PERSONALIZED RECOMMENDATION
========================================= */

exports.personalized = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const recipes = await Recipe.find({
      $or: [
        { _id: { $in: user.history || [] } },
        { cuisine: { $in: user.preferences || [] } },
      ],
    })
      .populate("author", "name")
      .limit(15);

    res.json(recipes);

  } catch (err) {
    res.status(500).json({ message: "Personalization error" });
  }
};

/* =========================================
   TRENDING RECIPES
========================================= */

exports.trending = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({
        likes: -1,
        saves: -1,
        views: -1,
        createdAt: -1,
      })
      .limit(10);

    res.json(recipes);

  } catch (err) {
    res.status(500).json({ message: "Trending error" });
  }
};
