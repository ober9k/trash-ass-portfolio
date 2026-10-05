import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import HoldingsCard from "@/components/holdings/holdingsCard";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import PortfolioCard from "@/components/portfolio/portfolioCard.tsx";
import { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();
  const { period } = getRouteApi("/").useSearch();
  const router = useRouter();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  const onToggle = (period: string) => {
    const search = (period !== Period.All.toString())
      ? { period } : { period: undefined }; /* clear it for all */

    router.navigate({
      to: "/",
      search: () => ({ ...search })
    });
  };

  return (
    <>
    <article style={{ backgroundColor: "#121212" }}>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
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
