import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC73c7j6TTXfXQp0paBy-PyEAXbkhw80ow",
  authDomain: "project--infosmart.firebaseapp.com",
  databaseURL: "https://project--infosmart-default-rtdb.firebaseio.com",
  projectId: "project--infosmart",
  storageBucket: "project--infosmart.firebasestorage.app",
  messagingSenderId: "649887732683",
  appId: "1:649887732683:web:fb08a26cc97c12e8981c4e",
  measurementId: "G-P09CE140KG"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços para usar no resto do site
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
