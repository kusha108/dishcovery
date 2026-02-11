const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    /* ========= REFERENCES ========= */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
      index: true,
    },

    /* ========= REVIEW DATA ========= */

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /* ========= MODERATION ========= */

    isEdited: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* ========= PREVENT DUPLICATES ========= */
// One review per user per recipe
ReviewSchema.index(
  { user: 1, recipe: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
