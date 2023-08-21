// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmm3KPA4SJvCULo00r9-BCPSVJM7EH-90",
  authDomain: "handtalker-5d150.firebaseapp.com",
  projectId: "handtalker-5d150",
  storageBucket: "handtalker-5d150.appspot.com",
  messagingSenderId: "217223598951",
  appId: "1:217223598951:web:be24220e3ad5f2334495c2",
  measurementId: "G-NGQ6WLBTJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(app);

export default app;
