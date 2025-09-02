// import express from "express";
// import {
//   createCategory,
//   getCategories,
//   deleteCategory,
//   updateCategory,
// } from "./category.controller.js";
// import upload from "../../middleware/multerMiddleware.js";

// const router = express.Router();

// router.post("/create", upload([{ name: "image", maxCount: 1 }]), createCategory);
// router.get("/", getCategories);
// router.delete("/:id", deleteCategory);
// router.put("/:id", upload([{ name: "image", maxCount: 1 }]), updateCategory);

// export default router;





import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "./category.controller.js";
import Upload from "../../middleware/multerMiddleware.js";

const router = express.Router();

// 📂 Cloudinary/categories folder
const upload = Upload("categories");

// CREATE category with image upload
router.post("/create", upload.single("image"), createCategory);

// GET all categories
router.get("/", getCategories);

// DELETE category by ID
router.delete("/:id", deleteCategory);

// UPDATE category with optional image upload
router.put("/:id", upload.single("image"), updateCategory);

export default router;
