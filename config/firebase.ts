import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAJKLqiAIR6Ot1M2iQwqbBqxlAdwbVtRrw",
  authDomain: "alphabi-assignment.firebaseapp.com",
  projectId: "alphabi-assignment",
  storageBucket: "alphabi-assignment.appspot.com",
  messagingSenderId: "476775138185",
  appId: "1:476775138185:web:5bb6902617f5d63945d758"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
