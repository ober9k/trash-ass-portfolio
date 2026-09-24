import { AuthContext } from "@/contexts/authContext.ts";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("`useAuthContext` must be used within an `AuthProvider`.")
  }

  return context;
}

export default useAuthContext;
