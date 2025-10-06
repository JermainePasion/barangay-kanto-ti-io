const admin = require("firebase-admin");
const path = require("path");

// Import your service account key
const serviceAccount = require(path.join(__dirname, "firebaseServiceAccountKey.json"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://barangay-kanto-tino.firebasestorage.app", // Replace with your bucket name
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
