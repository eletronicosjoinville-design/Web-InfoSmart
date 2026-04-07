import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC73c7j6TTXFXQp0paBy-PyEAXbkhw80ow", // Esta chave é essencial
  authDomain: "project--infosmart.firebaseapp.com",
  projectId: "project--infosmart",
  storageBucket: "project--infosmart.firebasestorage.app",
  messagingSenderId: "649887732683",
  appId: "1:649887732683:web:fb08a26cc97c12e8981c4e",
  measurementId: "G-P09CE148KG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);s