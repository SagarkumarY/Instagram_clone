import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE__PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE__STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE__MESSAGE_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE__APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage, app };



