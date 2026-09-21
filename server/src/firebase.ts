import { firebaseApp } from "@/config/firebase";
import { getFirestore } from "firebase-admin/firestore";

export const firestoreDb = getFirestore(firebaseApp);
