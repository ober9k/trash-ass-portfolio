import { type User as FirebaseUser } from "firebase/auth";
import { createContext } from "react";

export type AuthUser = FirebaseUser | null;

type AuthContextState = {
  user: AuthUser,
  setUser: (user: AuthUser) => void;
}

export const AuthContext = createContext<AuthContextState | undefined>(undefined);
