import mongoose from "mongoose";

const previousEditionSchema = new mongoose.Schema(
    {
        year: { type: Number, required: true, unique: true },
        title: { type: String, default: "Global Icon Excellence Awards" },
        editionLabel: { type: String, default: "" }, // e.g. "13th Edition"
        locations: { type: [String], default: [] },
        fullDate: { type: String, default: "" },     // e.g. "May 2025"
        fullDate: { type: String, default: "" },     // e.g. "May 2025"
        hero: { type: String, default: "" },
        slug: { type: String, unique: true },        // Auto-generated URL friendly title
        youtubeLink: { type: String, default: "" },  // Optional YouTube video URL
        coverImage: { type: String, default: "" },   // First image or manually set S3 URL
        images: { type: [String], default: [] },     // All S3 URLs for this edition
    },
    { timestamps: true }
);

export default mongoose.model("PreviousEdition", previousEditionSchema);
