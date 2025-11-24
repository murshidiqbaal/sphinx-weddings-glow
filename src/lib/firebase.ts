import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasAllConfigValues = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp | null = null;

if (hasAllConfigValues) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else {
  console.warn("Firebase configuration is incomplete. Admin updates will use local state only.");
}

export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

