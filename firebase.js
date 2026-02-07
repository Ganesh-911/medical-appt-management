import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmDTdT-DD_TzYlf4Dc4gjlJS-ivbzSe1M",
  authDomain: "medicalappt123456789.firebaseapp.com",
  projectId: "medicalappt123456789",
  storageBucket: "medicalappt123456789.firebasestorage.app",
  messagingSenderId: "951350240807",
  appId: "1:951350240807:web:aeb5605446036c44a85002"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;