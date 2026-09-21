import { AuthContext, type AuthUser } from "@/contexts/authContext.ts";
import { auth } from "@/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

type AuthProviderProps = {
  children: ReactNode,
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
