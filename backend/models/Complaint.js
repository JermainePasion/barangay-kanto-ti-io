const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    contact: String,
    description: String,
    category: String,
    imageUrl: { type: String, default: "" }, 
    status: { type: String, default: "Pending" },
    location: String,
    adminRemarks: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
