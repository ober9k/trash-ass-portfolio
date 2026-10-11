import NavigationBar from "@/components/layout/navigationBar.tsx";
import { Urls } from "@/config/urls.ts";
import { auth, signInWithGooglePopup } from "@/firebase.ts";
import useAuthContext from "@/hooks/useAuthContext.ts";
import { IconButton, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { ArrowLeft } from "lucide-react";

function SignInPage() {
  const { user, logout } = useAuthContext();

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
    }
    catch (error) {
      console.error("Sign-out error", error);
    }
  };

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="back">
      <Link to={Urls.Portfolio}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  return (
    <>
      <NavigationBar leftSlot={leftSlot}>
        <Typography variant="h4" component="h4" className="text-lg">
         Sign In
        </Typography>
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