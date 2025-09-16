import express from "express";
import { signup, login, logout, dashboard } from "./user.controller.js";

import { auth, requireRole } from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Only admin can access dashboard
router.get("/dashboard", auth, requireRole("admin"), dashboard);

export default router;
