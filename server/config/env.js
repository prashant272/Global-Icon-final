import dotenv from "dotenv";
dotenv.config();

console.log("Environment Variables Loaded (config/env.js)");
console.log("SMTP Host:", process.env.BREVO_SMTP_HOST);
console.log("Google callback:", process.env.GOOGLE_CALLBACK_URL);
