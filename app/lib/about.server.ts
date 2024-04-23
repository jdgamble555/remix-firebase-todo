import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

type AboutDoc = {
    name: string;
    description: string;
};

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