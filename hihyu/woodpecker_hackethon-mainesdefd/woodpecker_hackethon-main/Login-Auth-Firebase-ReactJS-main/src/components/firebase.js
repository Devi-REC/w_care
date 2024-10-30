// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXM4VY4Ip2oL8vDuLjnWzZli_1RBt8YdI",
  authDomain: "login-firebase-bafc5.firebaseapp.com",
  projectId: "login-firebase-bafc5",
  storageBucket: "login-firebase-bafc5.appspot.com",
  messagingSenderId: "268401132797",
  appId: "1:268401132797:web:2a266adf6480d3e3d3aa94"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;