import express from "express";
import { signup, login, logout } from "./user.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);



// Logout
router.post("/logout", logout);

export default router;

