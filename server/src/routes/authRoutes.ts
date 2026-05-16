import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController";

import protect from "../middleware/authMiddleware";

const router = express.Router();

/*
  REGISTER
*/
router.post("/register", registerUser);

/*
  LOGIN
*/
router.post("/login", loginUser);

/*
  PROTECTED ROUTE
*/
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
  });
});

export default router;