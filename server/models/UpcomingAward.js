import mongoose from "mongoose";

const upcomingAwardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, default: "" },
    location: { type: String, default: "" },
    desc: { type: String, default: "" },
    banners: { type: [String], default: [] },       // Main banner images slider
    guestImages: { type: [String], default: [] },   // Chief guest photos
    previousWinners: [{
      name: { type: String, default: "" },
      image: { type: String, required: true }
    }],
    link: { type: String, default: "" },
    slug: { type: String, unique: true, sparse: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-generate unique slug — using async/await without next()
upcomingAwardSchema.pre("save", async function () {
  if (!this.slug && this.title) {
    const base = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
      .slice(0, 60);

    let slug = base;
    let count = 0;
    // Use this.constructor for better compatibility inside pre-save
    const Model = this.constructor;
    while (await Model.exists({ slug, _id: { $ne: this._id } })) {
      count++;
      slug = `${base}-${count}`;
    }
    this.slug = slug;
  }
});

export default mongoose.model("UpcomingAward", upcomingAwardSchema);
