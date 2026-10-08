import NavigationBar from "@/components/layout/navigationBar.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { Urls } from "@/config/urls.ts";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

function NotFoundPage() {

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="back">
      <Link to={Urls.Portfolio}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  return (
    <>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={leftSlot}>
          <Typography variant="h4" component="h4" className="text-lg">
            Error
          </Typography>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <Card>
            <AltCardHeader title="Page Not Found" />
            <CardContent>
              Nothing to see here...
            </CardContent>
          </Card>
        </article>
      </article>
    </>
  );
}

export default NotFoundPage;
