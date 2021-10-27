import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// firebaseConfig obtenida de la consola

const firebaseConfig = {
    apiKey: "AIzaSyA8C9WipsqJojxphP55geiNqomhMFRbVCo",
    authDomain: "gameapp-29d61.firebaseapp.com",
    projectId: "gameapp-29d61",
    storageBucket: "gameapp-29d61.appspot.com",
    messagingSenderId: "219634906799",
    appId: "1:219634906799:web:3dcbb039263a4eeebcc65a"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export {
 db,
 googleAuthProvider,
 firebase
}