// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore as _getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFIpYubG28ISMgcR2MzvVDvCgkPYjK518",
    authDomain: "healthcare-5bcd5.firebaseapp.com",
    projectId: "healthcare-5bcd5",
    storageBucket: "healthcare-5bcd5.firebasestorage.app",
    messagingSenderId: "641811778117",
    appId: "1:641811778117:web:8cd4984ad749140b22f12c",
    measurementId: "G-ZNXMGEDE47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = _getFirestore(app); // ✅ named export


export default db;