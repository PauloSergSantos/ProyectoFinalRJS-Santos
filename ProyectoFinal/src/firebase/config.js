// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPz1vNeiFisGxzySSro6oumMFbJLlMvho",
    authDomain: "rj-ejemplos.firebaseapp.com",
    projectId: "rj-ejemplos",
    storageBucket: "rj-ejemplos.appspot.com",
    messagingSenderId: "120707198739",
    appId: "1:120707198739:web:2e7ab279504e2c595634e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)