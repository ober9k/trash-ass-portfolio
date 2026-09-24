import type { User } from "firebase/auth";
import { createContext } from "react";

type AuthContextState = {
  user:   User | null,
  login:  (user: User) => void,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextState | undefined>(undefined);
