import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true,
  })
);

// Import Routes
import storyRoutes from "./modules/story/story.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import authorRoutes from "./modules/author/author.routes.js"; 
import categoryRoutes from "./modules/category/category.routes.js";
import blogRoutes from "./modules/blogs/blog.routes.js";
import faqRoutes from "./modules/faqs/faq.routes.js";
import submissionRoute from "./modules/submission/submission.routes.js";
import uploadRoutes from "./routes/upload.route.js";
import commentRoutes from './modules/story/commnet.route.js';


// API Routes
app.use("/api/stories", storyRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/submissions", submissionRoute);
app.use("/api/uploads", uploadRoutes);




app.get("/", (req, res) => {
  res.send("Backend is running ");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;




