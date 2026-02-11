const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===============================
   TOKEN GENERATOR
================================ */

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      v: 1, // token versioning (future-proof)
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ===============================
   REGISTER
================================ */

exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    /* ===== VALIDATION ===== */

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    email = email.toLowerCase().trim();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6+ characters",
      });
    }

    /* ===== CHECK EXISTING ===== */

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    /* ===== HASH PASSWORD ===== */

    const hashed = await bcrypt.hash(password, 12);

    /* ===== CREATE USER ===== */

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* ===============================
   LOGIN
================================ */

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & password required",
      });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ===============================
   GET PROFILE
================================ */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("savedRecipes likedRecipes", "title image");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    console.error("PROFILE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};
