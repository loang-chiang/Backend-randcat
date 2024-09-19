// In this file we will initialize our firebase database

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: copy-paste the config variables found in your Firebase Project Settings!
const firebaseConfig = {
  apiKey: "AIzaSyBs9e26IB8bAj17-VP-nnZjejbu3360Fas",
  authDomain: "randcat-bf636.firebaseapp.com",
  projectId: "randcat-bf636",
  storageBucket: "randcat-bf636.appspot.com",
  messagingSenderId: "73483284725",
  appId: "1:73483284725:web:22876de42f34587de395bc",
  measurementId: "G-GM0Z2VYV89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
