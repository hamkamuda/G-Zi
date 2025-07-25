// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyAALBlEZuoqOMyjHXcpg-ToBM4uAazNXq8",
  authDomain: "gzi-app.firebaseapp.com",
  projectId: "gzi-app",
  storageBucket: "gzi-app.firebasestorage.app",
  messagingSenderId: "62939908860",
  appId: "1:62939908860:web:5cc5fa90a9bdf2c7e92579"
};
export const app = initializeApp(firebaseConfig);
