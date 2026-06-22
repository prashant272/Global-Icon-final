import express from "express";
import Blog from "../models/Blog.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import { uploadBlogImage } from "../middleware/s3BlogUpload.js";

const router = express.Router();

// GET all active blogs (Public)
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if (!req.query.admin) {
      filters.isActive = true;
    }
    const blogs = await Blog.find(filters).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog by slug (Public)
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create blog (Admin)
router.post("/", authenticate, requireAdmin, uploadBlogImage, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = req.file.location;
    }
    const newBlog = new Blog(payload);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update blog (Admin)
router.put("/:id", authenticate, requireAdmin, uploadBlogImage, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = req.file.location;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete blog (Admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
