import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";


firebase.initializeApp({
    apiKey: "AIzaSyAqIJp3aewD2i2B_vATUGSs-6OW5FtpfJs",
    authDomain: "tmi-project-b5049.firebaseapp.com",
    projectId: "tmi-project-b5049",
    storageBucket: "tmi-project-b5049.appspot.com",
    messagingSenderId: "314241630964",
    appId: "1:314241630964:web:28f1ef4054f735008b14a1",
    measurementId: "G-VTL27LBXLL"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}





