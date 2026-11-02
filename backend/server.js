import "dotenv/config";

import dns from "node:dns";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { rateLimit } from "express-rate-limit";

import connectDB from "./config/mongodb.js";
import { initializeAdmin } from "./modules/user/user.controller.js";

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

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.disable("x-powered-by");

// Leave this at 0 locally.
// When deployed, configure the exact number of trusted proxy hops.
const proxyHops = Number(
  process.env.TRUST_PROXY_HOPS || 0
);

if (
  !Number.isInteger(proxyHops) ||
  proxyHops < 0 ||
  proxyHops > 5
) {
  throw new Error(
    "TRUST_PROXY_HOPS must be an integer from 0 to 5"
  );
}

if (proxyHops > 0) {
  app.set("trust proxy", proxyHops);
}

const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    "https://storyious-figma.vercel.app",
    "https://storyious-figma-git-development-eman-nazirs-projects.vercel.app",
    "https://storyious-figma-ayarzlwol-eman-nazirs-projects.vercel.app",
    process.env.FRONTEND_URL,
  ]
    .filter(Boolean)
    .map((origin) =>
      origin.trim().replace(/\/+$/, "")
    )
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      const error = new Error(
        "This frontend origin is not allowed."
      );

      error.status = 403;
      return callback(error);
    },
    credentials: true,
  })
);

const limiter = (
  windowMs,
  limit,
  message,
  extra = {}
) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      success: false,
      message,
    },
    ...extra,
  });

// These limits run before body parsing and uploads.
app.use(
  "/api",
  limiter(
    15 * 60 * 1000,
    600,
    "Too many API requests. Try again later."
  )
);

app.post(
  "/api/users/login",
  limiter(
    15 * 60 * 1000,
    10,
    "Too many login attempts. Try again in 15 minutes.",
    {
      skipSuccessfulRequests: true,
    }
  )
);

app.post(
  "/api/users/signup",
  limiter(
    60 * 60 * 1000,
    5,
    "Too many signup attempts. Try again later."
  )
);

app.post(
  "/api/submissions/create",
  limiter(
    60 * 60 * 1000,
    5,
    "Too many submissions. Try again later."
  )
);

app.post(
  "/api/newsLetter/subscribe",
  limiter(
    60 * 60 * 1000,
    10,
    "Too many subscription attempts. Try again later."
  )
);

const commentLimiter = limiter(
  15 * 60 * 1000,
  60,
  "Too many comment or voting requests. Try again later."
);

app.use("/api/comments", (req, res, next) => {
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)
  ) {
    return commentLimiter(req, res, next);
  }

  return next();
});

const uploadLimiter = limiter(
  15 * 60 * 1000,
  20,
  "Too many upload requests. Try again in 15 minutes."
);

app.use("/api", (req, res, next) => {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    req.is("multipart/form-data")
  ) {
    return uploadLimiter(req, res, next);
  }

  return next();
});

app.use(
  express.json({
    limit: "1mb",
    strict: true,
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  next();
});

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

app.get("/", (req, res) => {
  res.status(200).send(
    "Storyious backend is running successfully."
  );
});

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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const requestedStatus = Number(
    error.statusCode || error.status
  );

  const status =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus <= 599
      ? requestedStatus
      : 500;

  console.error(
    req.method + " " + req.path + ": HTTP " + status
  );

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" &&
      status >= 500
        ? "Internal server error."
        : error.message || "Internal server error.",
    ...(error.field ? { field: error.field } : {}),
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();

    const server = app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          "Storyious backend listening on port " + PORT
        );
      }
    );

    server.on("error", (error) => {
      console.error(
        "Server failed to listen:",
        error.message
      );

      process.exit(1);
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app;