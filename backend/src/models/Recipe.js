const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    /* ========= BASIC INFO ========= */

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ========= COOKING DATA ========= */

    ingredients: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],

    steps: [String],

    cuisine: {
      type: String,
      default: "General",
      index: true,
    },

    cookTime: {
      type: Number, // minutes
      default: 10,
    },

    calories: {
      type: Number,
      default: 0,
      index: true,
    },

    /* ========= SOCIAL FEATURES ========= */

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    /* ========= ANALYTICS ========= */

    views: {
      type: Number,
      default: 0,
    },

    aiScore: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

/* ========= SEARCH INDEX ========= */

// Text search for smart search
RecipeSchema.index({
  title: "text",
  description: "text",
  ingredients: "text",
});

/* ========= TRENDING SCORE ========= */

RecipeSchema.methods.calculateTrendingScore = function () {
  return (
    this.likes.length * 3 +
    this.saves.length * 2 +
    this.views * 0.5 +
    this.rating * 5
  );
};

module.exports = mongoose.model("Recipe", RecipeSchema);
