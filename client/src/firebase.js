// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-zz.firebaseapp.com",
  projectId: "mernblog-zz",
  storageBucket: "mernblog-zz.firebasestorage.app",
  messagingSenderId: "1036129160506",
  appId: "1:1036129160506:web:8f73a2cd04048b36d85403",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
