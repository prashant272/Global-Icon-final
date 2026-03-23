import "./config/env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import nominationRoutes from "./routes/nominationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import previousEditionRoutes from "./routes/previousEditionRoutes.js";
import upcomingAwardRoutes from "./routes/upcomingAwardRoutes.js";
import passport from "./config/passport.js";

import PreviousEdition from "./models/PreviousEdition.js";
import UpcomingAward from "./models/UpcomingAward.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", true);
app.use(passport.initialize());

/**
 * =========================
 * CORS CONFIG (MUST BE FIRST)
 * =========================
 */
app.use(cors({
  origin: [
    "https://www.globaleducationawards.in",
    "https://globaleducationawards.in",
    "https://api.globaleducationawards.in",
    "https://business-leadership.primetimemedia.in",
    "https://investment-india.primetimemedia.in",
    "https://www.globaliconawards.in",
    "https://globaliconawards.in",
    "https://global-icon.primetimemedia.in",
    "https://india-excellence.primetimemedia.in",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));



/**
 * =========================
 * BODY PARSER
 * =========================
 */
app.use(express.json());

/**
 * =========================
 * STATIC FILES (LOCAL UPLOADS)
 * =========================
 */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * =========================
 * DATABASE
 * =========================
 */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1/primetime_awards";

mongoose
  .connect(MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "PrimeTime Awards API - V2" });
});

/**
 * =========================
 * SEO - Dynamic Robots.txt & Sitemap
 * =========================
 */

// Dynamic Robots.txt
app.get("/robots.txt", (req, res) => {
  const host = req.hostname;
  const protocol = req.protocol;
  
  const content = `User-agent: *
Allow: /
Sitemap: ${protocol}://${host}/sitemap.xml
`;
  res.type("text/plain");
  res.send(content);
});

// Dynamic Sitemap.xml
app.get("/sitemap.xml", async (req, res) => {
  const host = req.hostname;
  const protocol = req.protocol;
  const baseUrl = `${protocol}://${host}`;

  const staticPages = [
    "",
    "/categories",
    "/nominate",
    "/jury",
    "/guidelines",
    "/judging",
    "/contact",
    "/media",
    "/faq",
    "/terms"
  ];

  try {
    // Fetch dynamic pages
    const [editions, awards] = await Promise.all([
      PreviousEdition.find({}, "slug year"),
      UpcomingAward.find({ isActive: true }, "slug")
    ]);

    const editionPages = editions.map(e => `/editions/${e.slug || e.year}`);
    const awardPages = awards.map(a => `/upcoming-awards/${a.slug}`);

    const allPages = [...staticPages, ...editionPages, ...awardPages];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>' + (page === "" ? "1.0" : "0.8") + '</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    
    res.type("application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Error generating sitemap");
  }
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes); // Fallback for production proxy stripping /api
app.use("/api/nominations", nominationRoutes);
app.use("/nominations", nominationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/admin", adminRoutes);
app.use("/api/previous-editions", previousEditionRoutes);
app.use("/api/upcoming-awards", upcomingAwardRoutes);

/**
 * =========================
 * SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
