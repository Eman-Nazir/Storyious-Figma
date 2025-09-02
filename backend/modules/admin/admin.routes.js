import express from "express";
import { register, login, dashboard } from "../admin/admin.controller.js";
import  {adminAuth}  from "../../middleware_temp/adminAuth.js";

const router = express.Router();

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Dashboard (admin only)
router.get("/dashboard",adminAuth , dashboard);

export default router;
