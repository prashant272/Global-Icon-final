import express from "express";
import bcrypt from "bcryptjs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";

import User from "../models/User.js";
import Nomination from "../models/Nomination.js";
import { authenticate, requireAdmin, signToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Helper to get signed URL
const getSignedPdfUrl = async (key) => {
  if (!key) return null;
  if (key.startsWith("http")) {
    try {
      const url = new URL(key);
      key = url.pathname.substring(1);
    } catch {
      return key;
    }
  }
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error during admin login" });
  }
});

// List all nominations (admin)
router.get("/nominations", authenticate, requireAdmin, async (_req, res) => {
  try {
    const docs = await Nomination.find({})
      .populate("user", "email name role")
      .sort({ createdAt: -1 })
      .lean();

    // Generate signed URLs
    for (let doc of docs) {
      if (doc.pdfUrl) {
        doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
      }
    }

    return res.json(docs);
  } catch (err) {
    console.error("Fetch admin nominations error:", err);
    return res.status(500).json({ message: "Unable to fetch nominations" });
  }
});

// Update nomination status
router.patch("/nominations/:id/status", authenticate, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    const updated = await Nomination.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Update nomination status error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update status" });
  }
});

// Update nomination (admin)
router.put("/nominations/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const payload = req.body || {};
    // prevent user reassignment
    delete payload.user;

    const updated = await Nomination.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Update nomination error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update nomination" });
  }
});

// Delete nomination (admin)
router.delete("/nominations/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const deleted = await Nomination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nomination not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Delete nomination error:", err);
    return res.status(500).json({ message: "Unable to delete nomination" });
  }
});

export default router;

