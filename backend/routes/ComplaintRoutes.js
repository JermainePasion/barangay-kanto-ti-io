const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { bucket } = require("../config/firebaseConfig");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { category, description, location } = req.body;
    const userId = req.user.id;
    let imageUrl = "";

    // ✅ If image uploaded, send it to Firebase Storage
    if (req.file) {
      const fileName = `complaints/${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);

      // Upload file buffer directly
      await file.save(req.file.buffer, {
        metadata: { contentType: req.file.mimetype },
      });

      // Make the file public and generate a download URL
      await file.makePublic();
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

  
    const newComplaint = new Complaint({
      user: userId,
      category,
      description,
      location,
      imageUrl,
    });

    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: savedComplaint,
    });
  } catch (err) {
    console.error("❌ Error submitting complaint:", err);
    res.status(500).json({
      message: "Failed to submit complaint",
      error: err.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error: err.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "user",
      "name email role"
    );
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching complaint",
      error: err.message,
    });
  }
});


router.put("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json({
      message: "Complaint status updated",
      complaint: updatedComplaint,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating complaint",
      error: err.message,
    });
  }
});


router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting complaint",
      error: err.message,
    });
  }
});

module.exports = router;
