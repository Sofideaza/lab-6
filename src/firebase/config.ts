import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAywdTT00UlunfTTVLyVDpaZkqr79FjccM",
  authDomain: "gestion-de-tareas-440a1.firebaseapp.com",
  projectId: "gestion-de-tareas-440a1",
  storageBucket: "gestion-de-tareas-440a1.firebasestorage.app",
  messagingSenderId: "610451839005",
  appId: "1:610451839005:web:52ae5c99ab6b3e49320ef4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
