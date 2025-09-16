import express from "express";
import { 
  getAllFAQs, 
  getFAQsByCategory,
  getFAQBySlug, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from "./faq.controller.js";

const router = express.Router();

// Routes
router.get("/", getAllFAQs);          
router.get("/category/:category", getFAQsByCategory);   
router.get("/:slug", getFAQBySlug);   
router.post("/", createFAQ);         
router.put("/:id", updateFAQ);        
router.delete("/:id", deleteFAQ);     

export default router;