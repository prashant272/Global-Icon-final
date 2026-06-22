import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.pre("save", async function () {
  if (!this.slug && this.title) {
    const base = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
      .slice(0, 60);

    let slug = base;
    let count = 0;
    const Model = this.constructor;
    while (await Model.exists({ slug, _id: { $ne: this._id } })) {
      count++;
      slug = `${base}-${count}`;
    }
    this.slug = slug;
  }
});

export default mongoose.model("Blog", blogSchema);
