const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    contact: { type: String }, 
    description: { type: String, required: true },
    category: { type: String, required: true },
    photoUrl: { type: String }, 
    location: { type: String },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
