import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// firebaseConfig obtenida de la consola

// const firebaseConfig = {
//     apiKey: "AIzaSyA8C9WipsqJojxphP55geiNqomhMFRbVCo",
//     authDomain: "gameapp-29d61.firebaseapp.com",
//     projectId: "gameapp-29d61",
//     storageBucket: "gameapp-29d61.appspot.com",
//     messagingSenderId: "219634906799",
//     appId: "1:219634906799:web:3dcbb039263a4eeebcc65a"
//   };
  
// const firebaseConfig = {
//   apiKey: "AIzaSyA8C9WipsqJojxphP55geiNqomhMFRbVCo",
//   authDomain: "gameapp-29d61.firebaseapp.com",
//   databaseURL: "https://gameapp-29d61-default-rtdb.firebaseio.com",
//   projectId: "gameapp-29d61",
//   storageBucket: "gameapp-29d61.appspot.com",
//   messagingSenderId: "219634906799",
//   appId: "1:219634906799:web:4e075725e808f23cbcc65a"
// };

// nuevo
const firebaseConfig = {
  apiKey: "AIzaSyCj_b_ClE4uN9TOMo0R9eHSNVB8fJ54xd0",
  authDomain: "infojuego-8e41c.firebaseapp.com",
  projectId: "infojuego-8e41c",
  storageBucket: "infojuego-8e41c.appspot.com",
  messagingSenderId: "52763541363",
  appId: "1:52763541363:web:b5c54ef30d436aae108f06"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export {
 db,
 googleAuthProvider,
 firebase
}