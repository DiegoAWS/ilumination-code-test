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

const database = firebase.database().ref('/videos');

export {
  database,
  storage, 
  firebase as default
}