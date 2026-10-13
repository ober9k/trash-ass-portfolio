import HomeButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationBar from "@/components/layout/navigationBar";
import useAuthContext from "@/hooks/useAuthContext";
import { Card, CardContent, Typography } from "@mui/material";

function ProfilePage() {
  const { user } = useAuthContext();


  return (<>
    <article className="h-full min-h-screen bg-[#121212] pb-1">
      <NavigationBar leftSlot={<HomeButton />}>
        <Typography variant="h4" component="h4" className="text-lg">
          Profile
        </Typography>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <Card>
          <CardContent>
            <img src={user.photoURL} /><br/>
            <Typography>{user.displayName}</Typography>
            <Typography>{user.email}</Typography>
          </CardContent>
        </Card>
      </article>
    </article>
  </>);
}

export default ProfilePage;
