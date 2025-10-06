const Complaint = require("../models/Complaint");
const { bucket } = require("../config/firebaseConfig");
const multer = require("multer");
const path = require("path");


const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.createComplaint = [
  upload.single("image"), 
  async (req, res) => {
    try {
      const { category, description, location } = req.body;
      const userId = req.user.id; 

      let imageUrl = "";

      if (req.file) {
        const blob = bucket.file(`complaints/${Date.now()}_${req.file.originalname}`);
        const blobStream = blob.createWriteStream({
          metadata: { contentType: req.file.mimetype },
        });

        blobStream.on("error", (err) => console.error(err));

        blobStream.on("finish", async () => {
          // Public URL
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          const newComplaint = new Complaint({
            user: userId,
            category,
            description,
            imageUrl,
            location,
          });

          await newComplaint.save();
          res.status(201).json({ message: "Complaint submitted", complaint: newComplaint });
        });

        blobStream.end(req.file.buffer);
      } else {
        // No image provided
        const newComplaint = new Complaint({
          user: userId,
          category,
          description,
          location,
        });
        await newComplaint.save();
        res.status(201).json({ message: "Complaint submitted", complaint: newComplaint });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating complaint", error: error.message });
    }
  },
];
