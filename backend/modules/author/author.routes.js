import express from "express";
import upload from "../../Middleware/multerMiddleware.js";
import { getAllAuthors, getAuthorById, addAuthor } from "./author.controller.js";

const router = express.Router();

// GET all authors
router.get("/", getAllAuthors);

// GET author by ID
router.get("/:id", getAuthorById);

// POST create a new author
router.post(
  "/",
  upload([{ name: "image", maxCount: 1 }]), 
  addAuthor
);

export default router;
