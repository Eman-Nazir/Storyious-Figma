import express from "express";
import {
  toggleBookmark,
  checkBookmarkStatus,
  getUserBookmarks,
  removeBookmark
} from "./bookmark.controller.js";
import { auth } from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/toggle", toggleBookmark);
router.get("/status", checkBookmarkStatus);
router.get("/my-bookmarks", getUserBookmarks);
router.delete("/:bookmarkId", removeBookmark);

export default router;


