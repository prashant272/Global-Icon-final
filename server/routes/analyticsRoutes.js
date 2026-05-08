import express from "express";
import UserActivity from "../models/UserActivity.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/analytics/track
 * @desc Log a user action (Public)
 */
router.post("/track", async (req, res) => {
  try {
    const { visitorId, action, path, metadata } = req.body;

    if (!visitorId || !action) {
      return res.status(400).json({ message: "Missing required tracking data" });
    }

    await UserActivity.create({
      visitorId,
      action,
      path: path || "/",
      metadata: metadata || {},
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.status(204).send();
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @route GET /api/analytics/stats
 * @desc Get aggregated analytics stats (Admin only)
 */
router.get("/stats", authenticate, requireAdmin, async (req, res) => {
  try {
    const totalViews = await UserActivity.countDocuments({ action: "page_view" });
    const uniqueVisitors = await UserActivity.distinct("visitorId");
    
    // Recent activity log
    const recentActivity = await UserActivity.find()
      .sort({ createdAt: -1 })
      .limit(100);

    // Group by date for chart
    const dailyStats = await UserActivity.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: { $cond: [{ $eq: ["$action", "page_view"] }, 1, 0] } },
          uniqueVisitors: { $addToSet: "$visitorId" }
        }
      },
      {
        $project: {
          date: "$_id",
          views: 1,
          uniqueVisitorsCount: { $size: "$uniqueVisitors" }
        }
      },
      { $sort: { date: -1 } },
      { $limit: 30 }
    ]);

    res.json({
      summary: {
        totalViews,
        totalUniqueVisitors: uniqueVisitors.length,
      },
      dailyStats,
      recentActivity
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
