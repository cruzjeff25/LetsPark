import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCGJbsEzUd2ZaqHjkQQo6SNiy_C2FhiVbQ",
    authDomain: "let-s-park-5c05c.firebaseapp.com",
    databaseURL: "https://let-s-park-5c05c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "let-s-park-5c05c",
    storageBucket: "let-s-park-5c05c.appspot.com",
    messagingSenderId: "416164685068",
    appId: "1:416164685068:web:eac60f6f68f6a6f1851529",
    measurementId: "G-WMKJMFQ30H"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export default app;