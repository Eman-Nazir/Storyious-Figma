
import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  getAuthorBySlug,
  updateAuthor,
  deleteAuthor,
} from "./author.controller.js";

const router = express.Router();
const upload = Upload("authors");

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.get("/slug/:slug", getAuthorBySlug);

router.post("/", upload.single("image"), addAuthor);
router.put("/:id", upload.single("image"), updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;