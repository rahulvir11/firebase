const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountConfig.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get Firestore instance
const db = admin.firestore();

// Define the Firestore collection reference
const productCollection = db.collection("products");

// Export Firebase services
module.exports = {
  admin,             // Firebase Admin instance
  db,                // Firestore database instance
  productCollection, // Firestore 'product' collection reference
};
