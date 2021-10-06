// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCttTybCVssmLoOgO9gNPbEB92vRnqLFXA",
  authDomain: "signal-clone-1ecf9.firebaseapp.com",
  projectId: "signal-clone-1ecf9",
  storageBucket: "signal-clone-1ecf9.appspot.com",
  messagingSenderId: "483503797148",
  appId: "1:483503797148:web:a7bf6bb80cbca9fe104e59"
};

// Initialize Firebase
let app;
if ( firebase.apps.length === 0) {
     app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app();
}
 
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
