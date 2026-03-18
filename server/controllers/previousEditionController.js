import PreviousEdition from "../models/PreviousEdition.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3.js";

/* ---------- Helpers ---------- */
function s3KeyFromUrl(url) {
    try {
        const u = new URL(url);
        return u.pathname.startsWith("/") ? u.pathname.slice(1) : u.pathname;
    } catch {
        return null;
    }
}

async function deleteS3Objects(urls = []) {
    const BUCKET = process.env.AWS_S3_BUCKET;
    for (const url of urls) {
        const key = s3KeyFromUrl(url);
        if (!key) continue;
        try {
            await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
        } catch (err) {
            console.error("S3 delete error:", err.message);
        }
    }
}

function generateSlug(title, year, label) {
    let base = title || "Global Icon Excellence Awards";
    if (label) base += ` ${label}`;
    return base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${year}`;
}

/* ---------- GET /api/previous-editions ---------- */
export async function getAll(_req, res) {
    try {
        const editions = await PreviousEdition.find({})
            .sort({ year: -1 })
            .select("year title editionLabel slug locations fullDate hero coverImage images youtubeLinks")
            .lean();
        return res.json(editions);
    } catch (err) {
        console.error("getAll editions error:", err);
        return res.status(500).json({ message: "Failed to fetch editions" });
    }
}

/* ---------- GET /api/previous-editions/:yearOrSlug ---------- */
export async function getByYear(req, res) {
    try {
        const param = req.params.year; // The route defines it as :year

        let query = {};
        // If it's pure numbers, try searching by year first, otherwise fallback to slug
        if (/^\d+$/.test(param)) {
            query = { $or: [{ year: Number(param) }, { slug: param }] };
        } else {
            query = { slug: param };
        }

        const edition = await PreviousEdition.findOne(query).lean();
        if (!edition) return res.status(404).json({ message: "Edition not found" });
        return res.json(edition);
    } catch (err) {
        console.error("getByYear error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

/* ---------- POST /api/previous-editions ---------- */
export async function create(req, res) {
    try {
        const { year, title, editionLabel, locations, fullDate, hero, youtubeLinks } = req.body;

        if (!year) return res.status(400).json({ message: "Year is required" });

        // Build image URL array from uploaded files
        const imageUrls = (req.files || []).map((f) => f.location); // multer-s3 puts S3 URL in f.location

        const locationsArr = typeof locations === "string"
            ? locations.split(",").map((l) => l.trim()).filter(Boolean)
            : (locations || []);

        const finalTitle = title || "Global Icon Excellence Awards";
        const slug = generateSlug(finalTitle, year, editionLabel);

        const edition = new PreviousEdition({
            year: Number(year),
            title: finalTitle,
            editionLabel: editionLabel || "",
            slug,
            locations: locationsArr,
            fullDate: fullDate || String(year),
            hero: hero || "",
            youtubeLinks: typeof youtubeLinks === "string"
                ? youtubeLinks.split(",").map((l) => l.trim()).filter(Boolean)
                : (youtubeLinks || []),
            coverImage: imageUrls[0] || "",
            images: imageUrls,
        });

        const saved = await edition.save();
        return res.status(201).json(saved);
    } catch (err) {
        console.error("create edition error:", err);
        if (err.code === 11000)
            return res.status(409).json({ message: `Edition for year ${req.body?.year} or slug already exists` });
        return res.status(500).json({ message: err.message || "Server error" });
    }
}

/* ---------- PUT /api/previous-editions/:id ---------- */
export async function update(req, res) {
    try {
        const edition = await PreviousEdition.findById(req.params.id);
        if (!edition) return res.status(404).json({ message: "Edition not found" });

        const { year, title, editionLabel, locations, fullDate, hero, youtubeLinks, removeImages } = req.body;

        // Images to remove
        const toRemove = typeof removeImages === "string"
            ? JSON.parse(removeImages)
            : (removeImages || []);

        if (toRemove.length > 0) {
            await deleteS3Objects(toRemove);
            edition.images = edition.images.filter((url) => !toRemove.includes(url));
        }

        // Newly uploaded images
        const newImageUrls = (req.files || []).map((f) => f.location);
        edition.images = [...edition.images, ...newImageUrls];

        if (year !== undefined) edition.year = Number(year);
        if (title !== undefined) edition.title = title;
        if (editionLabel !== undefined) edition.editionLabel = editionLabel;
        if (youtubeLinks !== undefined) {
            edition.youtubeLinks = typeof youtubeLinks === "string"
                ? youtubeLinks.split(",").map((l) => l.trim()).filter(Boolean)
                : youtubeLinks;
        }
        if (locations !== undefined) {
            edition.locations = typeof locations === "string"
                ? locations.split(",").map((l) => l.trim()).filter(Boolean)
                : locations;
        }
        if (fullDate !== undefined) edition.fullDate = fullDate;
        if (hero !== undefined) edition.hero = hero;

        // Auto-update slug if title, year, or label changes
        if (title !== undefined || year !== undefined || editionLabel !== undefined) {
            edition.slug = generateSlug(edition.title, edition.year, edition.editionLabel);
        }

        // Update coverImage to first image if not set
        if (!edition.coverImage && edition.images.length > 0) {
            edition.coverImage = edition.images[0];
        }

        const saved = await edition.save();
        return res.json(saved);
    } catch (err) {
        console.error("update edition error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
}

/* ---------- DELETE /api/previous-editions/:id ---------- */
export async function del(req, res) {
    try {
        const edition = await PreviousEdition.findByIdAndDelete(req.params.id);
        if (!edition) return res.status(404).json({ message: "Edition not found" });

        // Delete all images from S3
        await deleteS3Objects([edition.coverImage, ...edition.images].filter(Boolean));

        return res.json({ ok: true });
    } catch (err) {
        console.error("delete edition error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
}
