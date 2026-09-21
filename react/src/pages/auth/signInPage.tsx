import NavigationMenu from "@/components/layout/navigationMenu.tsx";
import { auth, signInWithGooglePopup } from "@/firebase.ts";
import useAuthContext from "@/hooks/useAuthContext.ts";
import { signOut } from "firebase/auth";

function SignInPage() {
  const { user, setUser } = useAuthContext();

  const loginWithGoogle = async () => {
    try {
      await signInWithGooglePopup()
    }
    catch (error) {
      console.error("Sign-in error", error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    }
    catch (error) {
      console.error("Sign-out error", error);
    }
  };

  return (
    <>
      <NavigationMenu>
        Sign In
      </NavigationMenu>
      {user ? (
        <section className={"p-4"}>
          <div>
            <h3>Welcome, {user.displayName}</h3>
            <p>Email: {user.email}</p>
            <button onClick={logoutUser}>Sign out</button>
          </div>
        </section>
      ) : (
        <section className={"p-4"}>
          <h3>Welcome, Guest</h3>
          <button onClick={loginWithGoogle}>Sign in with Google</button>
        </section>
      )}
    </>
  )
}

export default SignInPage;