const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  likeRecipe,
  saveRecipe
} = require("../controllers/recipeController");

/* ===========================
   PUBLIC ROUTES
=========================== */

// Feed
router.get("/", getAllRecipes);

// Single recipe
router.get("/:id", getRecipeById);

/* ===========================
   PROTECTED ROUTES
=========================== */

// Create
router.post(
  "/",
  auth,
  upload.single("image"),
  createRecipe
);

// Like
router.put("/like/:id", auth, likeRecipe);

// Save
router.put("/save/:id", auth, saveRecipe);

// Delete
router.delete("/:id", auth, deleteRecipe);

module.exports = router;
