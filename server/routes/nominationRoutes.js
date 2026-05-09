import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";

import Nomination from "../models/Nomination.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { authenticate, optionalAuthenticate, signToken } from "../middleware/authMiddleware.js";
import { sendNominationConfirmation } from "../services/emailService.js";
import { sendLeadOTP } from "../services/whatsappService.js";
import Lead from "../models/Lead.js";
const router = express.Router();

// Generate 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

/**
 * @route POST /api/nominations/send-otp
 * @desc Send WhatsApp OTP for nomination verification
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { mobile, name } = req.body;
    if (!mobile) return res.status(400).json({ message: "Mobile number is required" });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // We don't save to DB yet, just return the OTP (or save to a temp session/record if needed)
    // Actually, let's find or create a draft nomination to store this OTP
    // But since we don't have an ID yet, we'll just send it and the frontend will send it back for verification
    
    await sendLeadOTP(mobile, name || "User", "Nomination Verification", otp);
    
    // For security in a real app, you'd store this in Redis or DB. 
    // Here we'll return a success and expect the user to verify in the next call.
    res.json({ message: "OTP sent successfully", otpHash: Buffer.from(otp).toString('base64') }); // Simple obfuscation for demo
  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

/**
 * @route POST /api/nominations/verify-otp
 * @desc Verify OTP and create/link user
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile, otp, name, email, otpHash, nominationId } = req.body;
    
    const decodedOtp = Buffer.from(otpHash, 'base64').toString();
    if (otp !== decodedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Logic to find/create user and return a token
    let user = await User.findOne({ email: email.toLowerCase() });
    let autoCreated = false;
    let passwordPlain = "";

    if (!user) {
      passwordPlain = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(passwordPlain, salt);
      user = await User.create({
        name: name || "User",
        email: email.toLowerCase(),
        passwordHash,
        isVerified: true,
        role: "user"
      });
      autoCreated = true;
    }

    // Link nomination to this user if it was a guest draft
    if (nominationId && mongoose.Types.ObjectId.isValid(nominationId)) {
      await Nomination.findByIdAndUpdate(nominationId, { user: user._id });
    }

    // Sign token
    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    // Return user, token and optional password
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, 
      passwordPlain: autoCreated ? passwordPlain : null 
    });
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

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

// Create a nomination (guest or logged-in user)
router.post("/", optionalAuthenticate, upload.single("pdf"), async (req, res) => {
  try {
    const payload = req.body || {};
    let pdfUrl = "";
    let userId = req.user?.id;
    let autoCreated = false;
    let passwordPlain = "";

    // Handle guest submission
    if (!userId) {
      // Determine email to use
      const emailToUse = (payload.contactEmail || payload.email || "").toLowerCase();
      
      if (emailToUse) {
        // Check if user already exists
        let user = await User.findOne({ email: emailToUse });

        if (!user) {
          // Create new user
          passwordPlain = Math.random().toString(36).slice(-8);
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(passwordPlain, salt);

          user = await User.create({
            name: payload.contactName || payload.nomineeName || "User",
            email: emailToUse,
            passwordHash: passwordHash,
            isVerified: true,
            role: "user"
          });
          autoCreated = true;
        }
        userId = user._id;
      } else if (!payload.visitorId) {
        // If no email AND no visitorId, we can't track it
        return res.status(400).json({ message: "Email or Visitor ID is required" });
      }
    }

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
      user: userId,
      pdfUrl: pdfUrl || undefined,
    });

    // Update Lead status
    const leadMobile = payload.mobile || payload.contactMobile || payload.orgHeadMobile;
    if (leadMobile) {
      await Lead.findOneAndUpdate(
        { mobile: leadMobile },
        { nominationStatus: (payload.currentStep >= 6) ? "done" : "incomplete" }
      );
    }

    const doc = nomination.toObject();
    if (doc.pdfUrl) {
      doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
    }

    // Determine name and email for confirmation from the form payload
    const confirmationEmail = (payload.contactEmail || payload.email || req.user?.email || "").toLowerCase();
    const confirmationName = payload.contactName || payload.nomineeName || req.user?.name || "User";

    // Send confirmation email ONLY on final step
    if (payload.currentStep >= 6) {
      sendNominationConfirmation(
        confirmationEmail,
        confirmationName,
        nomination.awardName || "Global Icon Awards",
        autoCreated ? passwordPlain : null
      ).catch(err =>
        console.error("Async confirmation email error:", err)
      );
    } else if (autoCreated) {
      // Optional: Send a welcome email with credentials instead of confirmation
      // For now, let's at least ensure they don't get the "Success" email early
    }

    return res.status(201).json({
      ...doc,
      autoCreated, // Let frontend know if an account was created
    });
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid nomination ID" });
    }
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid nomination ID" });
    }
    const nomination = await Nomination.findOne({ _id: req.params.id, user: req.user.id });
    if (!nomination) return res.status(404).json({ message: "Nomination not found" });

    // Only allow editing if status is "nominated" or "incomplete"
    if (nomination.status !== "nominated" && nomination.status !== "incomplete") {
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
      payload.pdfUrl = `nominations/${filename}`;
    }

    Object.assign(nomination, payload);
    await nomination.save();

    // Update Lead status
    const leadMobile = nomination.mobile || nomination.contactMobile || nomination.orgHeadMobile;
    if (leadMobile) {
      await Lead.findOneAndUpdate(
        { mobile: leadMobile },
        { nominationStatus: (nomination.currentStep >= 6) ? "done" : "incomplete" }
      );
    }

    // Send confirmation email ONLY on final step
    if (payload.currentStep >= 6) {
      const confirmationEmail = (nomination.contactEmail || nomination.email || req.user?.email || "").toLowerCase();
      const confirmationName = nomination.contactName || nomination.nomineeName || req.user?.name || "User";

      sendNominationConfirmation(
        confirmationEmail,
        confirmationName,
        nomination.awardName || "Global Icon Awards",
        payload.password || null
      ).catch(err =>
        console.error("Async confirmation email error (PUT):", err)
      );
    }

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

