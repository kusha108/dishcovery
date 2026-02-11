const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/userController");

/* ===========================
   USER ACTIONS
=========================== */

// Save / Unsave recipe
router.put("/save/:id", auth, userCtrl.toggleSave);

// Like / Unlike recipe
router.put("/like/:id", auth, userCtrl.toggleLike);

// Follow / Unfollow user
router.put("/follow/:id", auth, userCtrl.followUser);

// Get user profile
router.get("/profile/:id", userCtrl.getProfile);

// Dashboard stats
router.get("/dashboard", auth, userCtrl.dashboard);

module.exports = router;
