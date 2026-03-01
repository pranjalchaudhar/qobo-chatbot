import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Knowledge from "./contentModel.js";
import { scrapeWebsite } from "./scraper.js";
import Fuse from "fuse.js";

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// ---------------- MONGODB CONNECTION ----------------
console.log("MONGO_URI exists?", !!process.env.MONGO_URI);
console.log("MONGO_URI value:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

// ---------------- SEED ROUTE ----------------
// Run this ONCE to insert structured data
app.get("/api/seed", async (req, res) => {
  try {
    await scrapeWebsite();
    res.json({ message: "Structured website data inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Seeding failed." });
  }
});

// ---------------- CHAT ROUTE ----------------

app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ answer: "Please ask a question." });
    }

    const knowledge = await Knowledge.find();

    // Configure Fuse
    const fuse = new Fuse(knowledge, {
      keys: ["question", "keywords"],
      threshold: 0.7, // lower = stricter, higher = more flexible
      includeScore: true
    });

    const results = fuse.search(question);

    if (results.length > 0) {
      return res.json({ answer: results[0].item.answer });
    }

    // fallback
    const generalAnswer = `Here’s a quick overview of what Qobo offers:

• AI-powered website and mobile app builder
• Build your website simply by chatting on WhatsApp
• Supports ecommerce stores, service businesses, and mobile apps
• Includes payment gateways, domain setup, and hosting
• Works across industries like fashion, electronics, food, health, and more`;

    res.json({ answer: generalAnswer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Something went wrong." });
  }
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});