import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAksiHuH3zCucCZe-yv1jByYHPwr_IJo14",
  authDomain: "ilumination-code-test.firebaseapp.com",
  projectId: "ilumination-code-test",
  storageBucket: "ilumination-code-test.appspot.com",
  messagingSenderId: "223969727083",
  appId: "1:223969727083:web:c24723593fce96aa07572e"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

const databaseRef = firebase.database().ref('/videos');
const configStorage = databaseRef.child("videos")

export {
  configStorage,
  storage, 
  firebase as default
}