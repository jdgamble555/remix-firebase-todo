import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

type AboutDoc = {
    name: string;
    description: string;
};

const firebase_config = JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG);

const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

const db = getFirestore(app);

export const getAbout = async () => {

    const aboutSnap = await getDoc(
        doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data() as AboutDoc;
};