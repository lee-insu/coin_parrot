import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId:process.env.REACT_APP_FIREBASE_ANY_ID
  };

  firebase.initializeApp(firebaseConfig);
<<<<<<< HEAD
  
  const firebaseAuth = new firebase.auth();
  const firestore = new firebase.firestore();
  const user = firebaseAuth.currentUser;

  export {firebaseAuth, firestore, user };
=======
  firebase.analytics();
>>>>>>> cfa78ee5d262775a7bb2e851f4cafda5bc5636b3
