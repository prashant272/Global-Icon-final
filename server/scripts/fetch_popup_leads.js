import "../config/env.js";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import Nomination from "../models/Nomination.js";

async function run() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1/primetime_awards";
    await mongoose.connect(MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
    });

    // Fetch all leads
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    // Fetch all nominations
    const nominations = await Nomination.find({}).sort({ createdAt: -1 });

    // Helper to normalize phone numbers to last 10 digits
    const normalize = (num) => (num ? num.toString().replace(/\D/g, "").slice(-10) : null);

    // Group nominations by normalized mobile numbers to check websites
    const nominationMap = new Map();
    nominations.forEach((n) => {
      const website = n.website ? n.website.trim() : "";
      const hasWebsite = website.length > 0 && website.toLowerCase() !== "na" && website.toLowerCase() !== "n/a";
      const websiteVal = hasWebsite ? website : "";

      const m1 = normalize(n.mobile);
      const m2 = normalize(n.contactMobile);
      const m3 = normalize(n.orgHeadMobile);

      if (m1) {
        if (!nominationMap.has(m1) || (websiteVal && !nominationMap.get(m1).website)) {
          nominationMap.set(m1, { website: websiteVal, nomineeName: n.nomineeName });
        }
      }
      if (m2) {
        if (!nominationMap.has(m2) || (websiteVal && !nominationMap.get(m2).website)) {
          nominationMap.set(m2, { website: websiteVal, nomineeName: n.nomineeName });
        }
      }
      if (m3) {
        if (!nominationMap.has(m3) || (websiteVal && !nominationMap.get(m3).website)) {
          nominationMap.set(m3, { website: websiteVal, nomineeName: n.nomineeName });
        }
      }
    });

    console.log("=== POPUP NOMINATION LEADS ===");
    console.log("S.No | Name | Mobile Number | Website Status | Website Link");
    console.log("-----------------------------------------------------------");

    leads.forEach((l, index) => {
      const normMobile = normalize(l.mobile);
      const match = nominationMap.get(normMobile);
      const hasWebsite = match && match.website ? "Website Hai" : "Website Nahi Hai";
      const websiteUrl = match && match.website ? match.website : "-";
      console.log(`${index + 1} | ${l.name} | ${l.mobile} | ${hasWebsite} | ${websiteUrl}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
