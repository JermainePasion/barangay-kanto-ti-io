const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      userId: req.user.id, // link complaint to user
    });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaint" });
  }
});


router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComplaint)
      return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ message: "Error updating complaint" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting complaint" });
  }
});

module.exports = router;
