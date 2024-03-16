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




/// bEFOR CHANGE

// apiKey: "AIzaSyC29vWoDWY2TbXfavYUSbTS8QW6dS8thOM",
//   authDomain: "insta-clone-79512.firebaseapp.com",
//   projectId: "insta-clone-79512",
//   storageBucket: "insta-clone-79512.appspot.com",
//   messagingSenderId: "357944656047",
//   appId: "1:357944656047:web:0afed1b64e82dead67945a"


// After change

// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID