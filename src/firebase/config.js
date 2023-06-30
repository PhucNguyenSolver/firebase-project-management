// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1s-ZwwTq_tiuayeQuSisrOFNEnRRnVYk",
  authDomain: "delta-plus-a87fb.firebaseapp.com",
  projectId: "delta-plus-a87fb",
  storageBucket: "delta-plus-a87fb.appspot.com",
  messagingSenderId: "334412676552",
  appId: "1:334412676552:web:d022714035f11f1fe214fd",
  measurementId: "G-6Z8YPSZ76H",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)