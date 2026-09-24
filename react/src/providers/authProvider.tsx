import { AuthContext } from "@/contexts/authContext.ts";
import { auth } from "@/firebase.ts";
import { onAuthStateChanged, type User } from "firebase/auth";
import { type ReactNode, useEffect, useState } from "react";

type AuthProviderProps = {
  children: ReactNode,
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login  = (user: User | null) => setUser(user);
  const logout = () => setUser(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      login(user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-screen"}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
