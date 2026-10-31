import express from "express";

import {
  signup,
  login,
  logout,
  dashboard,
  getCurrentUser,
} from "./user.controller.js";

import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

// Account registration and login
router.post("/signup", signup);
router.post("/login", login);

// Logout clears the authentication cookie,
// including when the session has expired.
router.post("/logout", logout);

// Current authenticated user
router.get("/me", auth, getCurrentUser);

// Admin-only dashboard
router.get(
  "/dashboard",
  auth,
  requireRole("admin"),
  dashboard
);

export default router;