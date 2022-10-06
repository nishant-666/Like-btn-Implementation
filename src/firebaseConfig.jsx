// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH-p0VnARAIo7XCARYO67Jspm14v5a5fQ",
  authDomain: "like-button-bada7.firebaseapp.com",
  projectId: "like-button-bada7",
  storageBucket: "like-button-bada7.appspot.com",
  messagingSenderId: "419374053410",
  appId: "1:419374053410:web:529bd4b71b2b1b524b727b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
