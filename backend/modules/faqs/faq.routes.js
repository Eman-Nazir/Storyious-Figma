import express from "express";
import { 
  getAllFAQs, 
  getFAQBySlug, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from "./faq.controller.js";

const router = express.Router();

//  Routes
router.get("/", getAllFAQs);          
router.get("/:slug", getFAQBySlug);   
router.post("/", createFAQ);         
router.put("/:id", updateFAQ);        
router.delete("/:id", deleteFAQ);     

export default router;
