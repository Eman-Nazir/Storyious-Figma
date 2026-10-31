import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./config/mongodb.js";
import { initializeAdmin } from "./modules/user/user.controller.js";

// Routes
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
import bookmarkRoutes from "./modules/bookmark/bookmark.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Allowed frontend origins.
// FRONTEND_URL can contain your final Vercel website URL.
const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    "https://storyious-figma.vercel.app",
    "https://storyious-figma-git-development-eman-nazirs-projects.vercel.app",
    "https://storyious-figma-ayarzlwol-eman-nazirs-projects.vercel.app",
    process.env.FRONTEND_URL,
  ]
    .filter(Boolean)
    .map((origin) => origin.trim().replace(/\/+$/, ""))
);

// Apply CORS before routes and static files.
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as server requests.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      const error = new Error("This frontend origin is not allowed.");
      error.status = 403;
      return callback(error);
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Log method and path without exposing passwords or cookies.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Storyious backend is running successfully.");
});

// API routes
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
app.use("/api/bookmarks", bookmarkRoutes);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Central error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const requestedStatus = Number(error.statusCode || error.status);
  const status =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus <= 599
      ? requestedStatus
      : 500;

  console.error(`${req.method} ${req.path}: HTTP ${status}`);

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" && status >= 500
        ? "Internal server error."
        : error.message || "Internal server error.",
  });
});

// Connect to MongoDB before starting the server.
const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();

    // Listen in both development and production.
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Storyious backend listening on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server failed to listen:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;