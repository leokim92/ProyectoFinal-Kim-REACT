import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG,
  authDomain: "folkskorean.firebaseapp.com",
  projectId: "folkskorean",
  storageBucket: "folkskorean.appspot.com",
  messagingSenderId: "700428556037",
  appId: "1:700428556037:web:279070a9856fd283ec896c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);
