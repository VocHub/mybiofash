import * as firebase from "firebase/app"
import { collection, getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeAnalytics } from 'firebase/analytics';
import * as fireorm from 'fireorm';
import config from "./config";

// Initialize firebase app with analytics
const app = firebase.initializeApp(config.firebaseConfig);

export const analytics = initializeAnalytics(app);
export const db = getFirestore(app);
export const productsRef = collection(db, 'products');
export const categoriesRef = collection(db, 'categories');
export const orm = fireorm.initialize(db);
export const loginProvider = new GoogleAuthProvider();
export const auth = getAuth();

// export const messaging = getMessaging(app);

export default app;
