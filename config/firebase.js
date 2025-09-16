import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLWZfDfNTkRMJsKp4bZl8c1N4Q21adNSo",
  authDomain: "bd-express-a029d.firebaseapp.com",
  databaseURL: "https://bd-express-a029d-default-rtdb.firebaseio.com",
  projectId: "bd-express-a029d",
  storageBucket: "bd-express-a029d.firebasestorage.app",
  messagingSenderId: "676482622328",
  appId: "1:676482622328:web:f7ccad4966b58e3f92de8d",
  measurementId: "G-MYD1V0ZXY8"
};

// Evita reinicialização em hot-reload (nodemon)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
