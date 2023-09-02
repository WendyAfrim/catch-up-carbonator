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
  apiKey: "AIzaSyA_LgKWHfweniKHoK2UA3SPXdvGL3Dymzg",
  authDomain: "carbonator-1.firebaseapp.com",
  databaseURL: "https://carbonator-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carbonator-1",
  storageBucket: "carbonator-1.appspot.com",
  messagingSenderId: "1012895642209",
  appId: "1:1012895642209:web:09995a2b8f41b8554e3020"
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
