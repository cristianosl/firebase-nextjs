import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const getFirebaseAnalytics = isSupported().then(
  (supported) => supported && getAnalytics(firebaseApp)
);
