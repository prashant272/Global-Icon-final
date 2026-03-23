import express from "express";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import { uploadUpcomingFiles } from "../middleware/s3UpcomingUpload.js";
import UpcomingAward from "../models/UpcomingAward.js";

const router = express.Router();

const handleUpload = (req, res, next) => {
    uploadUpcomingFiles(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        next();
    });
};

/* ---- Public ---- */
router.get("/", async (req, res) => {
    try {
        const awards = await UpcomingAward.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(awards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:slug", async (req, res) => {
    try {
        const award = await UpcomingAward.findOne({ slug: req.params.slug });
        if (!award) return res.status(404).json({ message: "Not found" });
        res.json(award);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ---- Admin Only ---- */
router.post("/", authenticate, requireAdmin, handleUpload, async (req, res) => {
    try {
        const data = { ...req.body };

        // Handle banners
        data.banners = Array.isArray(data.banners) ? data.banners : [];
        if (req.files?.banners?.length) {
            const newBanners = req.files.banners.map((f) => f.location);
            data.banners = [...data.banners, ...newBanners];
        }

        // Handle guestImages
        data.guestImages = Array.isArray(data.guestImages) ? data.guestImages : [];
        if (req.files?.guestImages?.length) {
            const newGuests = req.files.guestImages.map((f) => f.location);
            data.guestImages = [...data.guestImages, ...newGuests];
        }

        // Handle cardImage
        if (req.files?.cardImage?.length) {
            data.cardImage = req.files.cardImage[0].location;
        }

        console.log("POST Body Keys:", Object.keys(req.body));
        console.log("POST Files Keys:", Object.keys(req.files || {}));
        
        data.previousWinners = [];
        if (data.winnersMetadata) {
            const metadata = JSON.parse(data.winnersMetadata);
            const files = req.files?.winnerImages || [];
            console.log("POST metadata:", metadata);
            console.log("POST winnerImages count:", files.length);

            data.previousWinners = metadata.map((m, idx) => ({
                name: m.name || "",
                image: files[idx] ? files[idx].location : ""
            })).filter(w => w.image);
            console.log("POST final winners count:", data.previousWinners.length);
        }

        // Parse isActive properly
        if (typeof data.isActive === "string") {
            data.isActive = data.isActive === "true";
        }

        const award = new UpcomingAward(data);
        await award.save();
        res.status(201).json(award);
    } catch (err) {
        console.error("POST /api/upcoming-awards error:", err);
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", authenticate, requireAdmin, handleUpload, async (req, res) => {
    try {
        const existing = await UpcomingAward.findById(req.params.id);
        if (!existing) return res.status(404).json({ message: "Not found" });

        const data = { ...req.body };
        
        // Update banners
        if (req.files?.banners?.length) {
            const newBanners = req.files.banners.map((f) => f.location);
            existing.banners = [...(existing.banners || []), ...newBanners];
        }
        
        // Update guestImages
        if (req.files?.guestImages?.length) {
            const newGuests = req.files.guestImages.map((f) => f.location);
            existing.guestImages = [...(existing.guestImages || []), ...newGuests];
        }

        // Update cardImage
        if (req.files?.cardImage?.length) {
            existing.cardImage = req.files.cardImage[0].location;
        }

        console.log("PUT Body Keys:", Object.keys(req.body));
        console.log("PUT Files Keys:", Object.keys(req.files || {}));

        // Update previousWinners (New winners being added)
        if (data.winnersMetadata) {
            const metadata = JSON.parse(data.winnersMetadata);
            const files = req.files?.winnerImages || [];
            console.log("PUT metadata:", metadata);
            console.log("PUT winnerImages count:", files.length);

            const newWinners = metadata.map((m, idx) => ({
                name: m.name || "",
                image: files[idx] ? files[idx].location : ""
            })).filter(w => w.image);
            console.log("PUT final newWinners count:", newWinners.length);

            existing.previousWinners = [...(existing.previousWinners || []), ...newWinners];
        }

        if (typeof data.isActive === "string") {
            data.isActive = data.isActive === "true";
        }

        // Reset slug if title changed
        if (data.title && data.title !== existing.title) {
            existing.slug = undefined;
        }

        // Prepare data for merge
        delete data.banners;
        delete data.guestImages;
        delete data.previousWinners;
        delete data.winnersMetadata;
        
        Object.assign(existing, data);
        const saved = await existing.save();
        console.log("PUT saved winners count:", saved.previousWinners?.length);
        res.json(saved);
    } catch (err) {
        console.error("PUT /api/upcoming-awards error:", err);
        res.status(400).json({ message: err.message });
    }
});

// Delete individual winner
router.delete("/:id/winner/:winnerId", authenticate, requireAdmin, async (req, res) => {
    try {
        const award = await UpcomingAward.findByIdAndUpdate(
            req.params.id,
            { $pull: { previousWinners: { _id: req.params.winnerId } } },
            { new: true }
        );
        res.json(award);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a specific banner image
router.delete("/:id/banner", authenticate, requireAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        await UpcomingAward.findByIdAndUpdate(req.params.id, {
            $pull: { banners: url },
        });
        res.json({ message: "Banner removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific guest image
router.delete("/:id/guest-image", authenticate, requireAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        await UpcomingAward.findByIdAndUpdate(req.params.id, {
            $pull: { guestImages: url },
        });
        res.json({ message: "Image removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
    try {
        await UpcomingAward.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
