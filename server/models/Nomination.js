import mongoose from "mongoose";

const nominationSchema = new mongoose.Schema(
  {
    awardName: {
      type: String,
      trim: true,
      default: "",
    },
    participationType: {
      type: String,
      required: true,
      trim: true,
    },
    nomineeName: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    // New fields for non-award types
    designation: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    preferredLocation: {
      type: [String],
      default: [],
    },
    pdfUrl: {
      type: String,
      trim: true,
    },
    // Award specific fields
    category: {
      type: String,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    otherSubCategory: {
      type: String,
      trim: true,
    },
    // Organization head
    orgHeadName: {
      type: String,
      trim: true,
    },
    orgHeadDesignation: {
      type: String,
      trim: true,
    },
    orgHeadMobile: {
      type: String,
      trim: true,
    },
    orgHeadEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Contact person
    contactName: {
      type: String,
      trim: true,
    },
    contactDesignation: {
      type: String,
      trim: true,
    },
    contactMobile: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Business details
    website: {
      type: String,
      trim: true,
      default: "",
    },
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
      default: "",
    },
    youtube: {
      type: String,
      trim: true,
      default: "",
    },
    turnover: {
      type: String,
      trim: true,
      default: "",
    },

    // Address
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },

    // General remarks visible to both admin and user
    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    // Nomination evaluation status (admin-controlled)
    status: {
      type: String,
      enum: ["nominated", "evaluation", "in_progress", "selected", "rejected"],
      default: "nominated",
    },

    // Financial / follow-up status (admin-only)
    paymentStatus: {
      type: String,
      enum: ["not_paid", "initial_paid", "paid", "not_interested"],
      default: "not_paid",
    },

    // Amount agreed/paid for this nomination (admin-only)
    amount: {
      type: String,
      trim: true,
      default: "",
    },

    // Final category decided by admin (can differ from user-selected category)
    assignedCategory: {
      type: String,
      trim: true,
      default: "",
    },

    // Internal remark for admin about status / payment / communication
    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful indexes for faster admin queries & filtering
nominationSchema.index({ user: 1, createdAt: -1 });
nominationSchema.index({ status: 1, createdAt: -1 });
nominationSchema.index({ paymentStatus: 1, createdAt: -1 });

const Nomination = mongoose.model("Nomination", nominationSchema);

export default Nomination;



