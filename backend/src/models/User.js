const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    /* ========= BASIC ========= */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "",
    },

    /* ========= AI PERSONALIZATION ========= */

    preferences: [
      {
        type: String, // cuisines or diet types
      },
    ],

    dietType: {
      type: String, // veg, keto, vegan
      default: "none",
    },

    /* ========= SOCIAL FEATURES ========= */

    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    likedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    /* ========= ROLE ========= */

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /* ========= ANALYTICS ========= */

    totalRecipes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
