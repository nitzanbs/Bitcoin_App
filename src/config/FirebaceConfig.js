// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-sw_TML1QiLDdzaKdaaUls2keuZFm9q0",
  authDomain: "bitcoin-app-2778f.firebaseapp.com",
  projectId: "bitcoin-app-2778f",
  storageBucket: "bitcoin-app-2778f.appspot.com",
  messagingSenderId: "670265439280",
  appId: "1:670265439280:web:5c2bcd6cab2748a8e269f5",
  measurementId: "G-91JV6QL8FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);