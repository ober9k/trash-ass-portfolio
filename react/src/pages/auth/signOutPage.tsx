import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
import NavigationBar from "@/components/layout/navigationBar";
import { Card, CardContent } from "@mui/material";

function SignOutPage() {
  return (<>
    <title>Sign Out</title>
    <article className="h-full min-h-screen bg-[#121212] pb-1">
      <NavigationBar leftSlot={HomeBackButton}>
        <NavigationTitle>Sign Out</NavigationTitle>
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
