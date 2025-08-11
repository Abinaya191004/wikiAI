import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST /search endpoint
app.post("/search", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // Wikipedia-style prompt
    const prompt = `Write a detailed Wikipedia-style article with history, overview, and key facts about ${topic}. 
    Make sure it's factual, organized, and similar to Wikipedia formatting.`

    // Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-70b-instruct", // Free high-quality model
        messages: [
          { role: "system", content: "You are a Wikipedia-style knowledge writer." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ content: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Optional GET /
app.get("/", (req, res) => {
  res.send("✅ WikiAI OpenRouter Backend is running! Use POST /search to query AI.");
});

app.listen(port, () => {
  console.log(`✅ OpenRouter backend running on http://localhost:${port}`);
});
