import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyDANWNmCkloLJqH7xCwSt6UFKvAFE2eDvs",
  authDomain: "istekram-5e37a.firebaseapp.com",
  databaseURL:
    "https://istekram-5e37a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "istekram-5e37a",
  storageBucket: "istekram-5e37a.appspot.com",
  messagingSenderId: "940370199376",
  appId: "1:940370199376:web:75dabf804f3653bdb46255",
  measurementId: "G-GDZ395F31B",
});

export const auth = getAuth(app);
export const db = getDatabase(app);
export const st = getStorage(app);
export default app;
