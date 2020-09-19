import * as firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-w8z8ollWZttoETyFL7Zkk-FVnhZoKdw",
  authDomain: "hackmit2020-a3fb0.firebaseapp.com",
  databaseURL: "https://hackmit2020-a3fb0.firebaseio.com/",
  projectId: "hackmit2020-a3fb0",
  storageBucket: "hackmit2020-a3fb0.appspot.com",
  messagingSenderId: "295002459820",
  appId: "1:295002459820:web:4f63a761bb6e0d1339d909"
};

firebase.initializeApp(firebaseConfig);
