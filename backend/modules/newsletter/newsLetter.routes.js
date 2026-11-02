import express from "express";
import mongoose from "mongoose";
import Newsletter from "./newsLetter.model.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";
import { validateEmail } from "../../utils/validation.js";

const router = express.Router();

const sendError = (res, error) => {
  if (error.statusCode === 400) {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Email already subscribed",
    });
  }

  return res.status(500).json({
    message: "Server error",
  });
};

// Public subscription.
router.post("/subscribe", async (req, res) => {
  try {
    const email = validateEmail(req.body?.email);

    if (await Newsletter.findOne({ email })) {
      return res.status(400).json({
        message: "Email already subscribed",
      });
    }

    await Newsletter.create({ email });

    return res.status(201).json({
      message: "Subscribed successfully!",
    });
  } catch (error) {
    return sendError(res, error);
  }
});

// Admin subscriber list.
router.get(
  "/",
  auth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const subscribers = await Newsletter.find().sort({
        createdAt: -1,
      });

      return res.json(subscribers);
    } catch (error) {
      return sendError(res, error);
    }
  }
);

// Admin subscriber update.
router.put(
  "/:id",
  auth,
  requireRole("admin"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid subscriber ID",
        });
      }

      const email = validateEmail(req.body?.email);

      const updated = await Newsletter.findByIdAndUpdate(
        req.params.id,
        { email },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updated) {
        return res.status(404).json({
          message: "Subscriber not found",
        });
      }

      return res.json(updated);
    } catch (error) {
      return sendError(res, error);
    }
  }
);

// Admin subscriber deletion.
router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid subscriber ID",
        });
      }

      const deleted = await Newsletter.findByIdAndDelete(
        req.params.id
      );

      if (!deleted) {
        return res.status(404).json({
          message: "Subscriber not found",
        });
      }

      return res.json({
        message: "Subscriber deleted successfully",
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
);

export default router;