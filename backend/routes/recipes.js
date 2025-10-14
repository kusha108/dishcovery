const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');
const { createRecipe, getAllRecipes, getRecipeById } = require('../controllers/recipeController');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', auth, upload.single('image'), createRecipe);

module.exports = router;
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await require('../models/Recipe').findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // ✅ Allow only the creator to delete their own recipe
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }

    // ✅ Delete image file (optional)
    const fs = require('fs');
    if (recipe.image && fs.existsSync(recipe.image)) {
      fs.unlinkSync(recipe.image);
    }

    await recipe.deleteOne();
    res.json({ message: '✅ Recipe deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting recipe:', error);
    res.status(500).json({ message: 'Server error while deleting recipe', error: error.message });
  }
});
