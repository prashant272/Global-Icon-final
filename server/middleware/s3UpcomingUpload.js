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
        const ext = file.originalname.split(".").pop();
        const filename = `upcoming-awards/${uuidv4()}.${ext}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
});

// Accept banners (up to 10) + guestImages (up to 20)
export const uploadUpcomingFiles = upload.fields([
    { name: "banners", maxCount: 10 },
    { name: "guestImages", maxCount: 20 },
    { name: "winnerImages", maxCount: 20 },
]);
