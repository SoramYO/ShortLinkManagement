// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-UA9GJHmTf_gO5AE-Sjnu4D9ChzRIAdk",
  authDomain: "locketvideo.firebaseapp.com",
  databaseURL: "https://locketvideo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "locketvideo",
  storageBucket: "locketvideo.appspot.com",
  messagingSenderId: "1085808708411",
  appId: "1:1085808708411:web:e282fbc9f6f8a73cb6051e",
  measurementId: "G-L9MYBTKV9Z"
};

const app : FirebaseApp = initializeApp(firebaseConfig);
const storage : FirebaseStorage = getStorage(app);

export { storage };
