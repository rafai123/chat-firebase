// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWqELPYRwCfFd6-_gdEA5j-ngYuqnE0Sw",
  authDomain: "chat-firebase-33964.firebaseapp.com",
  databaseURL: "https://chat-firebase-33964-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-firebase-33964",
  storageBucket: "chat-firebase-33964.appspot.com",
  messagingSenderId: "69330982600",
  appId: "1:69330982600:web:85900052792957ffbc77fd",
  measurementId: "G-2Q712T7T2T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp
