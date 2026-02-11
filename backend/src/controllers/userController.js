const User = require("../models/User");
const Recipe = require("../models/Recipe");

/* =================================
   TOGGLE SAVE RECIPE
================================= */

exports.toggleSave = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.id;

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const exists = user.savedRecipes.includes(recipeId);

    if (exists) {
      user.savedRecipes.pull(recipeId);
    } else {
      user.savedRecipes.push(recipeId);
    }

    await user.save();

    res.json({
      success: true,
      saved: user.savedRecipes,
    });

  } catch (err) {
    res.status(500).json({ message: "Error saving recipe" });
  }
};

/* =================================
   LIKE RECIPE (USER SIDE)
================================= */

exports.toggleLike = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.id;

    const exists = user.likedRecipes.includes(recipeId);

    if (exists)
      user.likedRecipes.pull(recipeId);
    else
      user.likedRecipes.push(recipeId);

    await user.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Error liking recipe" });
  }
};

/* =================================
   FOLLOW USER
================================= */

exports.followUser = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const targetId = req.params.id;

    if (me.following.includes(targetId)) {
      me.following.pull(targetId);
    } else {
      me.following.push(targetId);
    }

    await me.save();

    res.json({
      success: true,
      following: me.following,
    });

  } catch (err) {
    res.status(500).json({ message: "Follow error" });
  }
};

/* =================================
   GET USER PROFILE
================================= */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("savedRecipes", "title image")
      .populate("likedRecipes", "title image");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Profile error" });
  }
};

/* =================================
   DASHBOARD DATA
================================= */

exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const myRecipes = await Recipe.countDocuments({
      author: userId,
    });

    const saved = await User.findById(userId)
      .select("savedRecipes");

    res.json({
      success: true,
      stats: {
        myRecipes,
        savedCount: saved.savedRecipes.length,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};
