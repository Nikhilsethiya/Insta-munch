import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL_iQUB-ZDKWewv7gF-yGHKn2YoKCrRzk",
  authDomain: "insta-munch.firebaseapp.com",
  databaseURL: "https://insta-munch-default-rtdb.firebaseio.com",
  projectId: "insta-munch",
  storageBucket: "insta-munch.appspot.com",
  messagingSenderId: "22724611820",
  appId: "1:22724611820:web:669302d81d4d7bef7adfc9",
  measurementId: "G-2MR29GV4PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export default app;