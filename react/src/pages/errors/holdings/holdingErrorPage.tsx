import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { Card, CardContent, Typography } from "@mui/material";

function HoldingErrorPage({ error, reset }) {
  return (
    <>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={HomeBackButton}>
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

export default HoldingErrorPage;
