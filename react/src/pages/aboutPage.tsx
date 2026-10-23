import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import { getIconClass } from "@/utils/iconUtils.ts";
import logoUrl from "@/assets/images/logo.png";
import { Box, Card, CardContent, Typography } from "@mui/material";

function AboutPage() {
  return (
    <>
      <title>About Trash Ass Portfolio</title>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={HomeBackButton}>
          <NavigationTitle>About</NavigationTitle>
        </NavigationBar>
        <article className="m-2 flex flex-col gap-4 p-2">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Trash Ass Portfolio
              </Typography>
              <Typography>
                An experimental app for tracking a cryptocurrency portfolio and
                managing its transactions.
              </Typography>
              <Box component="section" className="flex justify-center p-8 pb-4">
                <img className="h-32 w-32" src={logoUrl as string} alt={"Trash Ass Portfolio"} />
              </Box>
            </CardContent>
          </Card>
        </article>
      </article>
    </>
  );
}

export default AboutPage;
