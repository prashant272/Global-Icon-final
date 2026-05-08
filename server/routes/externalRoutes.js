import express from "express";
import GlobalSetting from "../models/GlobalSetting.js";
import Nomination from "../models/Nomination.js";
import Lead from "../models/Lead.js";

const router = express.Router();

/**
 * Middleware to verify External API Key
 */
const verifyExternalKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ message: "API Key required" });

  const setting = await GlobalSetting.findOne({ key: "external_crm_api_key" });
  if (!setting || setting.value !== apiKey) {
    return res.status(403).json({ message: "Invalid API Key" });
  }
  next();
};

/**
 * GET /api/external/nominations
 * Fetch all nominations for CRM
 */
router.get("/nominations", verifyExternalKey, async (req, res) => {
  try {
    const { status, limit = 1000, page = 1 } = req.query;
    const query = {};
    if (status) query.status = status;

    const nominations = await Nomination.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("user", "name email");

    res.json({
      count: nominations.length,
      data: nominations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/external/leads
 * Fetch all leads for CRM
 */
router.get("/leads", verifyExternalKey, async (req, res) => {
  try {
    const { limit = 1000, page = 1 } = req.query;
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      count: leads.length,
      data: leads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
