const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ComplaintRoutes = require("./routes/ComplaintRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Allowed frontends
const allowedOrigins = [
  "https://barangay-kanto-tino.vercel.app",
  "https://barangay-kanto-tino-goeln8iby-jermaine-pasions-projects.vercel.app"
];

// CORS middleware (apply BEFORE routes)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Body parser
app.use(express.json());

// Routes
app.use("/api/complaints", ComplaintRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("BIICS Backend Running...");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
