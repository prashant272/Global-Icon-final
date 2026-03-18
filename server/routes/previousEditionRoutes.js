import express from "express";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import { uploadEditionImages } from "../middleware/s3EditionUpload.js";
import {
    getAll,
    getByYear,
    create,
    update,
    del,
} from "../controllers/previousEditionController.js";

const router = express.Router();

/* ---- Public ---- */
router.get("/", getAll);
router.get("/:year", getByYear);

/* ---- Admin Only ---- */
const adminUpload = (req, res, next) => {
    uploadEditionImages(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

router.post("/", authenticate, requireAdmin, adminUpload, create);
router.put("/:id", authenticate, requireAdmin, adminUpload, update);
router.delete("/:id", authenticate, requireAdmin, del);

export default router;
