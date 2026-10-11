import NavigationBar from "@/components/layout/navigationBar";
import { Urls } from "@/config/urls";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

function ProfilePage() {

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="back">
      <Link to={Urls.Portfolio}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  return (<>
    <article className="h-full min-h-screen bg-[#121212] pb-1">
      <NavigationBar leftSlot={leftSlot}>
        <Typography variant="h4" component="h4" className="text-lg">
          Profile
        </Typography>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <Card>
          <CardContent>
            Profile Page.
          </CardContent>
        </Card>
      </article>
    </article>
  </>);
}

export default ProfilePage;
