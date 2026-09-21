import { AuthContext } from "@/contexts/authContext.ts";
import { useContext } from "react";

function useAuthContext() {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
}

export default useAuthContext;
