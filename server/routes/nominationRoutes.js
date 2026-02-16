import express from "express";
import multer from "multer";
import path from "path";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";

import Nomination from "../models/Nomination.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { sendNominationConfirmation } from "../services/emailService.js";

const router = express.Router();

// Use memory storage for R2 uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper to get signed URL
const getSignedPdfUrl = async (key) => {
  if (!key) return null;
  // If it's already a full URL (legacy), try to extract key or return as is
  if (key.startsWith("http")) {
    try {
      const url = new URL(key);
      key = url.pathname.substring(1); // remove leading slash
    } catch {
      return key;
    }
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  // URL expires in 1 hour (3600 seconds)
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

// Create a nomination (logged-in user)
router.post("/", authenticate, upload.single("pdf"), async (req, res) => {
  try {
    const payload = req.body || {};
    let pdfUrl = "";

    if (req.file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `pdf-${uniqueSuffix}${path.extname(req.file.originalname)}`;

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `nominations/${filename}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      // ONLY store the KEY in the database
      pdfUrl = `nominations/${filename}`;
    }

    const nomination = await Nomination.create({
      ...payload,
      user: req.user.id,
      pdfUrl: pdfUrl || undefined,
    });

    const doc = nomination.toObject();
    if (doc.pdfUrl) {
      doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
    }

    // Send confirmation email asynchronously
    sendNominationConfirmation(req.user.email, req.user.name).catch(err =>
      console.error("Async confirmation email error:", err)
    );

    return res.status(201).json(doc);
  } catch (err) {
    console.error("Create nomination error:", err);
    return res.status(400).json({
      message: err?.message || "Unable to create nomination",
    });
  }
});

// Fetch current user's nominations
router.get("/my", authenticate, async (req, res) => {
  try {
    const docs = await Nomination.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Generate signed URLs for each nomination
    for (let doc of docs) {
      if (doc.pdfUrl) {
        doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
      }
    }

    return res.json(docs);
  } catch (err) {
    console.error("Fetch my nominations error:", err);
    return res.status(500).json({ message: "Unable to fetch nominations" });
  }
});

// Fetch a single nomination by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const doc = await Nomination.findOne({ _id: req.params.id, user: req.user.id }).lean();
    if (!doc) return res.status(404).json({ message: "Nomination not found" });

    if (doc.pdfUrl) {
      doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
    }

    return res.json(doc);
  } catch (err) {
    console.error("Fetch nomination error:", err);
    return res.status(500).json({ message: "Unable to fetch nomination" });
  }
});

// Update a nomination
router.put("/:id", authenticate, upload.single("pdf"), async (req, res) => {
  try {
    const nomination = await Nomination.findOne({ _id: req.params.id, user: req.user.id });
    if (!nomination) return res.status(404).json({ message: "Nomination not found" });

    // Only allow editing if status is "nominated"
    if (nomination.status !== "nominated") {
      return res.status(403).json({ message: "This nomination can no longer be edited" });
    }

    const payload = { ...req.body };
    if (req.file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `pdf-${uniqueSuffix}${path.extname(req.file.originalname)}`;

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `nominations/${filename}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      // ONLY store the KEY
      payload.pdfUrl = `nominations/${filename}`;
    }

    Object.assign(nomination, payload);
    await nomination.save();

    const doc = nomination.toObject();
    if (doc.pdfUrl) {
      doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
    }

    return res.json(doc);
  } catch (err) {
    console.error("Update nomination error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update nomination" });
  }
});

export default router;

