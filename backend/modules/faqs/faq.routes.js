import express from "express";
import { getAllFAQs, getFAQBySlug, createFAQ } from "./faq.controller.js";

const router = express.Router();

// Routes
router.get("/", getAllFAQs);           

router.get("/:slug", getFAQBySlug);    

router.post("/", createFAQ);          

export default router;