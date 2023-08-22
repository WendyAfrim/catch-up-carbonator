// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'carbonator-1.firebaseapp.com',
  projectId: 'carbonator-1',
  storageBucket: 'carbonator-1.appspot.com',
  messagingSenderId: process.env.messaging_Sender_Id,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if(user) {
       console.log(user);
    } else {
      console.log('error')
    }
  })
}
const logout = async () => {
  await signOut(auth);
}
const db = getFirestore(app);
console.log('in index')

export {
  db,
  auth,
  monitorAuthState,
  logout
}
