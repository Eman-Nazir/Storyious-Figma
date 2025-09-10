




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

// Create a blog
router.post("/", upload.array("images"), createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog by ID
router.get("/:id", getSingleBlog);

// Update a blog by ID
router.put("/:id", upload.array("images"), updateBlog);

// Delete a blog by ID
router.delete("/:id", deleteBlog);

export default router;
