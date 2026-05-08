import express from "express";
import Lead from "../models/Lead.js";
import Nomination from "../models/Nomination.js";
import { sendLeadOTP } from "../services/whatsappService.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all leads (Admin only)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const [leads, nominations] = await Promise.all([
      Lead.find().sort({ createdAt: -1 }),
      Nomination.find({}, "mobile contactMobile orgHeadMobile")
    ]);

    // Create a set of normalized mobile numbers (last 10 digits)
    const nominatedMobiles = new Set();
    const normalize = (num) => (num ? num.toString().replace(/\D/g, "").slice(-10) : null);

    nominations.forEach(n => {
      const m1 = normalize(n.mobile);
      const m2 = normalize(n.contactMobile);
      const m3 = normalize(n.orgHeadMobile);
      if (m1) nominatedMobiles.add(m1);
      if (m2) nominatedMobiles.add(m2);
      if (m3) nominatedMobiles.add(m3);
    });

    const leadsWithStatus = leads.map(l => {
      const leadObj = l.toObject();
      const normalizedLeadMobile = normalize(l.mobile);
      leadObj.nominationStatus = (normalizedLeadMobile && nominatedMobiles.has(normalizedLeadMobile)) ? "done" : "pending";
      return leadObj;
    });

    res.status(200).json(leadsWithStatus);
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP for simplicity
};

// Submit lead and send OTP
router.post("/submit", async (req, res) => {
  try {
    const { name, mobile, purpose, visitorId } = req.body;

    if (!name || !mobile || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let lead = await Lead.findOne({ mobile });

    if (lead) {
      lead.name = name;
      lead.purpose = purpose;
      if (visitorId) lead.visitorId = visitorId;
      lead.otp = otp;
      lead.otpExpires = otpExpires;
      await lead.save();
    } else {
      lead = await Lead.create({
        name,
        mobile,
        purpose,
        visitorId,
        otp,
        otpExpires,
      });
    }

    // Send WhatsApp OTP
    await sendLeadOTP(mobile, name, purpose, otp);

    res.status(200).json({ message: "OTP sent successfully via WhatsApp", mobile });
  } catch (error) {
    console.error("Lead submission error:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile and OTP are required" });
    }

    const lead = await Lead.findOne({ mobile });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (lead.otp !== otp || lead.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    lead.isVerified = true;
    lead.otp = undefined;
    lead.otpExpires = undefined;
    await lead.save();

    res.status(200).json({ message: "Mobile number verified successfully", lead });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
});

// Resend OTP
router.post("/resend", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const lead = await Lead.findOne({ mobile });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const otp = generateOTP();
    lead.otp = otp;
    lead.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await lead.save();

    await sendLeadOTP(lead.mobile, lead.name, lead.purpose, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});

export default router;
