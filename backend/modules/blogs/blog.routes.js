
import express from "express";
import { 
  createBlog, 
  getBlogs, 
  updateBlog, 
  deleteBlog, 
  getSingleBlog 
} from "../blogs/blog.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";

const router = express.Router();
const upload = Upload("blogs"); 

// CREATE BLOG
router.post("/", upload.array("images"), createBlog);

// GET ALL BLOGS
router.get("/", getBlogs);

// GET SINGLE BLOG
router.get("/:id", getSingleBlog);

// UPDATE BLOG
router.put("/:id", upload.array("images"), updateBlog);

// DELETE BLOG
router.delete("/:id", deleteBlog);

export default router;