import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
import NavigationBar from "@/components/layout/navigationBar";
import useAuthContext from "@/hooks/useAuthContext";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSnackbar, type VariantType } from "notistack";

function ProfilePage() {
  const { user } = useAuthContext();

  console.log(user);
  
  const { enqueueSnackbar } = useSnackbar();

  const triggerToastNotification = (variant: VariantType = "success") => () => {
    enqueueSnackbar("Successfully Updated.", { variant, anchorOrigin: { vertical: "bottom", horizontal: "center" } });
  };

  return (<>
    <article className="h-full min-h-screen bg-[#121212] pb-1">
      <NavigationBar leftSlot={HomeBackButton}>
        <NavigationTitle>Profile</NavigationTitle>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <Card>
          <CardContent>
            <img src={user.photoURL} /><br/>
            <Typography>{user.displayName}</Typography>
            <Typography>{user.email}</Typography><br/>
            <Button onClick={triggerToastNotification()}>Show Success</Button>
          </CardContent>
        </Card>
      </article>
    </article>
  </>);
}

export default ProfilePage;
