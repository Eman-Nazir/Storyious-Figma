// import express from "express";
// import { createBlog, getBlogs } from "../blogs/blog.controller.js";
// import upload from "../../middleware/multerMiddleware.js";

// const router = express.Router();

// router.post("/", upload([{ name: "image", maxCount: 1 }]), createBlog);

// router.get("/", getBlogs);

// export default router;





import express from "express";
import { createBlog, getBlogs } from "../blogs/blog.controller.js";
import Upload from "../../middleware/multerMiddleware.js";

const router = express.Router();

// 📂 Save blog images in Cloudinary/blogs folder
const upload = Upload("blogs");

router.post("/", upload.array("images"), createBlog); // multiple images
router.get("/", getBlogs);

export default router;
