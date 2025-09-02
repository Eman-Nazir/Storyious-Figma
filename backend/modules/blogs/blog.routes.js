
import express from "express";
import { createBlog, getBlogs } from "../blogs/blog.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";

const router = express.Router();

const upload = Upload("blogs");

router.post("/", upload.array("images"), createBlog); 
router.get("/", getBlogs);

export default router;
