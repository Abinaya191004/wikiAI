import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://wikiai-f51a1.web.app', 'http://localhost:5500'], 
    credentials: true
}));

app.use(bodyParser.json());

// Set Cross-Origin-Opener-Policy for Firebase Authentication
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

// Set Referrer-Policy for API requests
app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
    next();
});

// Enhanced search endpoint with better formatting
app.post("/search", async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }
        
        // Add a check to ensure the API key is set
        if (!process.env.OPENROUTER_API_KEY) {
            console.error("OpenRouter API Error: API key is not configured.");
            return res.status(500).json({ error: "Backend configuration error: API key missing." });
        }

        // Enhanced Wikipedia-style prompt for better formatting
        const prompt = `Write a comprehensive, well-structured Wikipedia-style article about "${topic}". 

        Structure the article with:
        1. Start with a clear introductory paragraph defining/explaining the topic
        2. Use proper section headers (use ## for main sections, ### for subsections)
        3. Include relevant historical background, key concepts, and important details
        4. Write in an encyclopedic, neutral tone
        5. Make it factually accurate and informative
        6. Use bullet points for lists where appropriate
        7. Include interesting facts and current relevance
        
        Format the content clearly with proper headings and paragraphs. Avoid using asterisks (*) for emphasis - instead write naturally with clear, informative content.`;

        // Call OpenRouter API with enhanced parameters
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions", // Corrected URL string
            {
                model: "meta-llama/llama-3.1-70b-instruct",
                messages: [
                    { 
                        role: "system", 
                        content: "You are an expert encyclopedia writer. Create well-structured, informative articles similar to Wikipedia entries. Use clear formatting with proper headings and comprehensive content." 
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    }
                ],
                max_tokens: 2000,
                temperature: 0.3, // Lower temperature for more factual content
                top_p: 0.9
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5000", // Optional: helps with rate limiting
                    "X-Title": "WikiAI Search" // Optional: helps with usage tracking
                }
            }
        );

        const content = response.data.choices[0].message.content;
        
        // Enhanced response with metadata
        res.json({ 
            content: content,
            topic: topic,
            timestamp: new Date().toISOString(),
            model: "meta-llama/llama-3.1-70b-instruct",
            success: true
        });

    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        
        // Enhanced error handling
        if (error.response) {
            res.status(error.response.status).json({ 
                error: "AI service error", 
                details: error.response.data?.error?.message || "Unknown API error",
                timestamp: new Date().toISOString()
            });
        } else if (error.request) {
            res.status(503).json({ 
                error: "AI service unavailable", 
                details: "Unable to connect to AI service",
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({ 
                error: "Internal server error", 
                details: "Something went wrong on our end",
                timestamp: new Date().toISOString()
            });
        }
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "WikiAI Backend",
        version: "2.0.0"
    });
});

// Enhanced root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "🧠 WikiAI Backend API",
        version: "2.0.0",
        endpoints: {
            search: "POST /search - Search for topics using AI",
            health: "GET /health - Service health check"
        },
        status: "✅ Online",
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        message: "The requested endpoint does not exist",
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: "Something went wrong",
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`🚀 WikiAI Backend v2.0.0 running on port ${port}`);
    console.log(`📡 Health check: http://localhost:${port}/health`);
    console.log(`🔍 Search endpoint: http://localhost:${port}/search`);
    console.log(`🔑 OpenRouter API configured: ${process.env.OPENROUTER_API_KEY ? '✅' : '❌'}`);
});