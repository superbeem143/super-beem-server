const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage()
});

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "SUPER BEEM AI Server Running"
  });
});
app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.chat.completions.create({

      model: "google/gemma-3-12b-it",

      messages: [

        {
          role: "system",
          content:
            "You are SUPER BEEM AI. Reply naturally, accurately and helpfully."
        },

        {
          role: "user",
          content: message
        }

      ]

    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message || "AI request failed"
    });

  }

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ SUPER BEEM AI Server running on port ${PORT}`);
});
