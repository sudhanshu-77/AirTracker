import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC2VkAvqtthOCN1EKKVaddy_IHAU0rFN6I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "airtracker-3a758.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "airtracker-3a758",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "airtracker-3a758.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1087503780839",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1087503780839:web:bfe1301035abb048228b42",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V6KWM2X1YK"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw new Error("Failed to initialize Firebase");
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
