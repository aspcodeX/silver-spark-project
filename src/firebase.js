// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Agar tere paas apna project hai toh wahan se keys le aa, 
// nahitoh filhal testing ke liye yeh config use kar:
const firebaseConfig = {
  apiKey: "AIzaSyBHKcsyfT5zPyezLrdnh15HDm6PzSns_uQ",
  authDomain: "red-lotus-web-599d6.firebaseapp.com",
  projectId: "red-lotus-web-599d6",
  storageBucket: "red-lotus-web-599d6.firebasestorage.app",
  messagingSenderId: "1016063564473",
  appId: "1:1016063564473:web:870573f828781e41f75968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);