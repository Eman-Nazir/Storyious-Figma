

import express from "express";
import upload from "../../middleware/multerMiddleware.js";
import {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  updateAuthor,
} from "./author.controller.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", upload([{ name: "image", maxCount: 1 }]), addAuthor);
router.put("/:id", upload([{ name: "image", maxCount: 1 }]), updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
