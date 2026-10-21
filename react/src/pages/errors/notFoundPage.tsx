import HomeBackButton from "@/components/layout/navigation/homeBackButton.tsx";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { Card, CardContent } from "@mui/material";

function NotFoundPage() {
  return (
    <>
      <title>Not Found</title>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={HomeBackButton}>
          <NavigationTitle>Not Found</NavigationTitle>
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
