import express from "express";
import { getRecipes, addRecipe } from "../controllers/recipeController.js";
import {protect} from "../middleware/authmiddleware.js";

const router = express.Router();

// GET all recipes: GET http://localhost:5000/api/recipes
router.get( '/',getRecipes);

// ADD a recipe: POST http://localhost:5000/api/recipes/add
// You can optionally protect the GET if needed
router.post('/add',addRecipe);

export default router;

