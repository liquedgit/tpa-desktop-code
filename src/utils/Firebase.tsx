// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD0Buxb13nhH3cNG2h4JOrvnV92H6mdwzE",
//   authDomain: "tpa-desktop-41f8a.firebaseapp.com",
//   projectId: "tpa-desktop-41f8a",
//   storageBucket: "tpa-desktop-41f8a.appspot.com",
//   messagingSenderId: "424067660881",
//   appId: "1:424067660881:web:9622bfaf21d0524734cc70",
//   measurementId: "G-VT7EJ96CZN"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCJ-fPSLK__fFq_tFFLcNhEOcU381KLPXw",
  authDomain: "tpa-desktop-2-7a9f1.firebaseapp.com",
  projectId: "tpa-desktop-2-7a9f1",
  storageBucket: "tpa-desktop-2-7a9f1.appspot.com",
  messagingSenderId: "298439995326",
  appId: "1:298439995326:web:e412e4f13bed93ad6193ef",
  measurementId: "G-8KRB3SLE45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);