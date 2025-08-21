import express from "express";
import { registerUser, loginUser, forgotPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgotpassword", forgotPassword); // 👈 Add this line

export default router;
