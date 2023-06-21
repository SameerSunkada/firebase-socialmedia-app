// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsC-AZzTa-8e-eqH-vbdnLf2x5dvNn5r4",
  authDomain: "fir-social-media-project-1a9f3.firebaseapp.com",
  projectId: "fir-social-media-project-1a9f3",
  storageBucket: "fir-social-media-project-1a9f3.appspot.com",
  messagingSenderId: "729421632626",
  appId: "1:729421632626:web:0a0897e92ef050f3761eeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);