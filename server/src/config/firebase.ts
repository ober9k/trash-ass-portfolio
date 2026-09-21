import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import serviceAccount from "../../secret/serviceAccountKey.json" assert { type: "json" };

dotenv.config();

initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth();
