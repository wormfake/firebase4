// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOSka8HZA-zYDbsowJYM8SvNH-lunmF20",                   // Không có trong token → bạn phải lấy từ Firebase Console
  authDomain: "api-project-431765977501.firebaseapp.com",
  projectId: "api-project-431765977501",
  storageBucket: "api-project-431765977501.appspot.com",
  messagingSenderId: "431765977501",
  appId: "1:431765977501:android:41daebd0b093ab7b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };