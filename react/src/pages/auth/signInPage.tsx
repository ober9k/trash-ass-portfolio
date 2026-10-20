import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import { auth, signInWithGooglePopup } from "@/firebase.ts";
import useAuthContext from "@/hooks/useAuthContext.ts";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";

function SignInPage() {
  const { user, logout } = useAuthContext();
  const queryClient = useQueryClient();

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup()
    }
    catch (error) {
      console.error("Sign-in error", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      logout();
      queryClient.clear();
    }
    catch (error) {
      console.error("Sign-out error", error);
    }
  };

  return (
    <>
      <NavigationBar leftSlot={HomeBackButton}>
        <NavigationTitle>Sign In</NavigationTitle>
      </NavigationBar>
      {user ? (
        <section className={"p-4"}>
          <div>
            <h3>Welcome, {user.displayName}</h3>
            <p>Email: {user.email}</p>
            <button onClick={signOutUser}>Sign out</button>
          </div>
        </section>
      ) : (
        <section className={"p-4"}>
          <h3>Welcome, Guest</h3>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </section>
      )}
    </>
  )
}

export default SignInPage;