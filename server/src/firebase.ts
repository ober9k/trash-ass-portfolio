import dotenv from "dotenv";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "..//secret/serviceAccountKey.json" assert { type: "json" };

dotenv.config();

export const firebase = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth();
export const firestore = getFirestore(firebase);
