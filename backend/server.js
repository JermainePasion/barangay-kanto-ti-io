const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ComplaintRoutes = require("./routes/ComplaintRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// List of allowed frontend URLs (add more if needed)
const allowedOrigins = [
  "https://barangay-kanto-tino.vercel.app",
  "https://barangay-kanto-tino-goeln8iby-jermaine-pasions-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200
}));


app.options("*", cors());


app.use(express.json());

// Routes
app.use("/api/complaints", ComplaintRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("BIICS Backend Running...");
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
