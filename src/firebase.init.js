// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpM7HK8PylYvEwlSoYLzTgkoXV9kMLdw8",
  authDomain: "email-password-auth-d6db6.firebaseapp.com",
  projectId: "email-password-auth-d6db6",
  storageBucket: "email-password-auth-d6db6.appspot.com",
  messagingSenderId: "449771264053",
  appId: "1:449771264053:web:9a25218dee5c74fa0cb97c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;