import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/mongodb.js";
import { initializeAdmin } from "./modules/user/user.controller.js";

dotenv.config();

const app = express();

//  Connect to Database 
connectDB().then(() => {
  initializeAdmin().catch((err) =>
    console.error(" Admin initialization failed:", err.message)
  );
});

//  Allowed Origins 
const allowedOrigins = [
  "http://localhost:5173",
  "https://storyious-figma.vercel.app",
  "https://storyious-figma-git-development-eman-nazirs-projects.vercel.app",
  "https://storyious-figma-ayarzlwol-eman-nazirs-projects.vercel.app",
];

//  Middlewares 
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

//  Import Routes 
import storyRoutes from "./modules/story/story.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import authorRoutes from "./modules/author/author.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import blogRoutes from "./modules/blogs/blog.routes.js";
import faqRoutes from "./modules/faqs/faq.routes.js";
import submissionRoutes from "./modules/submission/submission.routes.js";
import uploadRoutes from "./routes/upload.route.js";
import commentRoutes from "./modules/story/commnet.route.js";
import newsletterRoutes from "./modules/newsletter/newsLetter.routes.js";
import searchRoutes from "./modules/search/search.route.js";
import bookmarkRoutes from './modules/bookmark/bookmark.routes.js';
//  API Routes 
app.use("/api/stories", storyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/newsLetter", newsletterRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/bookmarks', bookmarkRoutes);


// Add this to your server.js or app.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    cookies: req.cookies
  });
  next();
});
//  Default Route 
app.get("/", (req, res) => {
  res.send(" Storyious backend is running successfully.");
});


//  Start Server 
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(` Server running at: http://localhost:${PORT}`)
  );
}

export default app;




