import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const app = firebase.initializeApp({
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

export const auth = app.auth();
export const db = app.database();
export const st = app.storage();
export default app;
