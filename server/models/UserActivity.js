import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true, // e.g., 'page_view', 'popup_open', 'popup_close', 'lead_start'
    index: true
  },
  path: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ip: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Compound index for analyzing visitor journeys
userActivitySchema.index({ visitorId: 1, createdAt: -1 });

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
