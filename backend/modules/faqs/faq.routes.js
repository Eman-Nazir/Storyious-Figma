import express from "express";
import { 
  getAllFAQs, 
  getFAQsByCategory,
  getFAQBySlug, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ,
  getFAQCategories,   
} from "./faq.controller.js";

const router = express.Router();

// Routes
router.get("/", getAllFAQs);          
router.get("/categories", getFAQCategories); 
router.get("/category/:category", getFAQsByCategory);   
router.get("/:slug", getFAQBySlug);   
router.post("/", createFAQ);         
router.put("/:id", updateFAQ);        
router.delete("/:id", deleteFAQ);     

export default router;
