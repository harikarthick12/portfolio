// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ_IbXOGA0KdDmCqzpUEnAhKM3s4B9dV4",
    authDomain: "harikarthick-70eed.firebaseapp.com",
    projectId: "harikarthick-70eed",
    storageBucket: "harikarthick-70eed.firebasestorage.app",
    messagingSenderId: "886086950564",
    appId: "1:886086950564:web:418afa6575dfc3078ed031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
