import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";


firebase.initializeApp({
    apiKey: "AIzaSyAwur53dyJwuAGt0lMM94CjkyYpUmYTnIY",
    authDomain: "tmi-project-51ae0.firebaseapp.com",
    projectId: "tmi-project-51ae0",
    storageBucket: "tmi-project-51ae0.appspot.com",
    messagingSenderId: "744276142085",
    appId: "1:744276142085:web:4fb7cc05d0db46908c546c",
    measurementId: "G-FZ10626NME"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}



