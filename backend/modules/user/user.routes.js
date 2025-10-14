import express from "express";
import {
  signup,
  login,
  logout,
  dashboard,
  getCurrentUser,
  initializeAdmin,
} from "./user.controller.js";
import { auth, requireRole } from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

initializeAdmin().catch((err) =>
  console.error(" Admin init error:", err.message)
);

// ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", auth, getCurrentUser);

// Admin-only route
router.get("/dashboard", auth, requireRole("admin"), dashboard);

export default router;

