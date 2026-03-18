import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import s3Client from "../config/s3.js";

const BUCKET = process.env.AWS_S3_BUCKET;

const storage = multerS3({
    s3: s3Client,
    bucket: BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        const year = req.body?.year || "unknown";
        const ext = file.originalname.split(".").pop();
        const filename = `editions/${year}/${uuidv4()}.${ext}`;
        cb(null, filename);
    },
});

// Accept up to 50 images at once
export const uploadEditionImages = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
}).array("images", 50);
