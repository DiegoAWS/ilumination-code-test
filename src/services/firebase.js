import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ilumination-code-test.firebaseapp.com",
  projectId: "ilumination-code-test",
  storageBucket: "ilumination-code-test.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage().ref("videos");

const database = firebase.database().ref("/videos");

export { database, storage, firebase as default };
