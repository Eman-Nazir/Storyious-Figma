import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
connectDB();
const allowedOrigins = [
  'http://localhost:5173',
  'https://storyious-figma.vercel.app',
  'storyious-figma-git-development-eman-nazirs-projects.vercel.app',
  'storyious-figma-ayarzlwol-eman-nazirs-projects.vercel.app'
];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));



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
import newsletterRoutes from './modules/newsletter/newsLetter.routes.js';
import searchRoutes from "./modules/search/search.route.js";


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
app.use("/api/newsLetter", newsletterRoutes);
app.use("/api/search", searchRoutes);



app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error"
  });
});

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




