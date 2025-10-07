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

router.get("/top-liked", async (req, res) => {
  try {
    const topComplaints = await Complaint.aggregate([
      {
        $addFields: { likesCount: { $size: { $ifNull: ["$likes", []] } } }
      },
      { $sort: { likesCount: -1, createdAt: -1 } }, // most liked first
      { $limit: 10 }
    ]);

    // Populate user manually after aggregation
    const populated = await Complaint.populate(topComplaints, { path: "user", select: "name email" });

    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top complaints", error: err.message });
  }
});

router.get("/my-complaints", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userComplaints = await Complaint.find({ user: userId })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    if (!userComplaints || userComplaints.length === 0) {
      return res.status(200).json({ message: "You have no complaints yet", complaints: [] });
    }

    res.status(200).json(userComplaints);
  } catch (err) {
    console.error("Error fetching user's complaints:", err);
    res.status(500).json({
      message: "Failed to fetch user complaints",
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
    const { status, adminRemarks } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminRemarks }, // ✅ include remarks field
      { new: true }
    );

    if (!updatedComplaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json({
      message: "Complaint updated successfully",
      updatedComplaint, // ✅ consistent key
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating complaint",
      error: err.message,
    });
  }
});

router.put("/:id/admin-update", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;

    const validStatuses = ["Pending", "In Progress", "Resolved"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (adminRemarks !== undefined) updateData.adminRemarks = adminRemarks;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedComplaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json({
      message: "Complaint updated successfully",
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

router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    const userId = req.user.id;

    if (complaint.likes.includes(userId)) {
      return res.status(400).json({ message: "You already liked this complaint" });
    }

    complaint.likes.push(userId);
    await complaint.save();

    res.status(200).json({ message: "Liked successfully", likes: complaint.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Error liking complaint", error: err.message });
  }
});

router.put("/:id/unlike", verifyToken, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    const userId = req.user.id;

    if (!complaint.likes.includes(userId)) {
      return res.status(400).json({ message: "You haven't liked this complaint yet" });
    }

    complaint.likes.pull(userId);
    await complaint.save();

    res.status(200).json({ message: "Unliked successfully", likes: complaint.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Error unliking complaint", error: err.message });
  }
});





module.exports = router;
