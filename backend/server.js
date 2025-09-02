
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";



dotenv.config();

const app = express();

// Middlewares 
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Connection Error:", err));

//  Import Routes 
import storyRoutes from "./modules/story/story.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import authorRoutes from "./modules/author/author.routes.js"; 
import categoryRoutes from "./modules/category/category.routes.js";
import blogRoutes from "./modules/blogs/blog.routes.js";
import faqRoutes from "./modules/faqs/faq.routes.js";
import submissionRoute from "./modules/submission/submission.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js"



app.use("/api/stories", storyRoutes);
 app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/submissions", submissionRoute);


//  ADMIN ROUTES
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
