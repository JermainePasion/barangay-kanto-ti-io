// firebaseConfig.js
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Must be called first to load env variables

// Ensure the Firebase service account key is defined
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in .env");
}

// Parse the JSON from env and replace escaped newlines with actual newlines
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString("utf-8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://barangay-kanto-tino.firebasestorage.app", // your bucket name
});

// Export the storage bucket instance
const bucket = admin.storage().bucket();

module.exports = { bucket };
