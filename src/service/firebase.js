import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey:process.env.FIREBASE_REACT_APP_API_KEY ,
    authDomain:process.env.FIREBASE_REACT_APP_AUTH ,
    databaseURL:process.env.FIREBASE_REACT_APP_DATABASE ,
    projectId:process.env.FIREBASE_REACT_APP_PROJECT_ID ,
    storageBucket:process.env.FIREBASE_REACT_APP_STORAGE ,
    messagingSenderId:process.env.FIREBASE_REACT_APP_MESSAGING ,
    appId: process.env.FIREBASE_REACT_APP_APP_ID,
    measurementId:process.env.FIREBASE_REACT_APP_ANY_ID 
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();