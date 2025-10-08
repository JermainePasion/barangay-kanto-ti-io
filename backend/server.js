const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ComplaintRoutes = require("./routes/ComplaintRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();


app.use(cors({
  origin: "https://barangay-kanto-tino.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
