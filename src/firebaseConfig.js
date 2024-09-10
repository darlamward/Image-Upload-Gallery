// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1bhPomIU-GzKARkEpdm_8fC6_IwutSVc",
    authDomain: "parados-60cae.firebaseapp.com",
    projectId: "parados-60cae",
    storageBucket: "parados-60cae.appspot.com",
    messagingSenderId: "924519874470",
    appId: "1:924519874470:web:eaaafa29c85ac3b723d967",
    measurementId: "G-BME52XM5XL"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };

  