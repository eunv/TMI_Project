import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";


firebase.initializeApp({
    apiKey: "AIzaSyBafCnYhxIUKitujbC2vmof5__Jl_bNBjg",
    authDomain: "tmi-project-57cdd.firebaseapp.com",
    projectId: "tmi-project-57cdd",
    storageBucket: "tmi-project-57cdd.appspot.com",
    messagingSenderId: "677251735734",
    appId: "1:677251735734:web:5d3ae8389dce80118f4617",
    measurementId: "G-V7RT6MKFYV"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}





