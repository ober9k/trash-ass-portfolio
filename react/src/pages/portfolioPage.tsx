import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import HoldingsCard from "@/components/holdings/holdingsCard";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import PortfolioCard from "@/components/portfolio/portfolioCard.tsx";
import { Urls } from "@/config/urls.ts";
import { Typography } from "@mui/material";
import { Period } from "@shared/types/period.ts";
import { getRouteApi, useRouter } from "@tanstack/react-router";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi(Urls.Portfolio).useLoaderData();
  const { period } = getRouteApi(Urls.Portfolio).useSearch();
  const router = useRouter();

  const onToggle = (period: string) => {
    const search = (period !== Period.All.toString())
      ? { period } : { period: undefined }; /* clear it for all */

    router.navigate({
      to: Urls.Portfolio,
      search: () => ({ ...search })
    });
  };

  return (
    <>
    <article style={{ backgroundColor: "#121212" }}>
      <NavigationBar>
        <Typography variant="h4" component="h4" className="text-lg">
          My Portfolio
        </Typography>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <PortfolioCard portfolio={portfolio} />
        <PeriodToggle period={period} onToggle={onToggle} />
        <HoldingsCard holdings={holdings} />
      </article>
    </article>
    </>
  );
}

export default PortfolioPage;
