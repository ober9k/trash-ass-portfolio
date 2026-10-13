import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationBar from "@/components/layout/navigationBar";
import { Card, CardContent, Typography } from "@mui/material";

function SignOutPage() {
  return (<>
    <article className="h-full min-h-screen bg-[#121212] pb-1">
      <NavigationBar leftSlot={HomeBackButton}>
        <Typography variant="h4" component="h4" className="text-lg">
          Profile
        </Typography>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <Card>
          <CardContent>
            Sign Out Page.
          </CardContent>
        </Card>
      </article>
    </article>
  </>);
}

export default SignOutPage;
