import {getApp, getApps, initializeApp} from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const appLen = getApps().length
const app = !appLen ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);

if(process.env.NODE_ENV !== 'production' && !appLen) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199)
}

export {auth, db, storage}
export default app;