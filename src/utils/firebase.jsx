import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7ZGSYfI7MzG54Drj_yy8lynaaaBCHPpE",
  authDomain: "guun-f12d1.firebaseapp.com",
  projectId: "guun-f12d1",
  storageBucket: "guun-f12d1.appspot.com",
  messagingSenderId: "980085112204",
  appId: "1:980085112204:web:161f3ff7e6663f2db96aa9",
  measurementId: "G-YP3M6RPKNT",
};

const FirebaseApp = () => {
  initializeApp(firebaseConfig);
};

export default FirebaseApp;
