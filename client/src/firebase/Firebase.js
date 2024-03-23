// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkMsuI1-I71hR7yhzZE4aXtF6jRSmP54A",
  authDomain: "recet-5e19d.firebaseapp.com",
  projectId: "recet-5e19d",
  storageBucket: "recet-5e19d.appspot.com",
  messagingSenderId: "311553696235",
  appId: "1:311553696235:web:86841abe2ec021d17f39ae",
  measurementId: "G-T27CYHPES7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app,db}