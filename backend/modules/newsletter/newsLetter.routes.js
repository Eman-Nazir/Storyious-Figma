import express from "express";
import Newsletter from "../newsletter/newsLetter.model.js";

const router = express.Router();

// Subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error("Newsletter fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const updated = await Newsletter.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Subscriber not found" });

    res.json(updated);
  } catch (err) {
    console.error("Newsletter update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Subscriber not found" });

    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    console.error("Newsletter delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
