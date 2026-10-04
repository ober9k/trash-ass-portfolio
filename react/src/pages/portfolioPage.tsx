import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import HoldingsList from "@/components/holdings/holdingsList.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import PortfolioCard from "@/components/portfolio/portfolioCard.tsx";
import { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();
  const router = useRouter();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  const onToggle = (period: Period) => {
    const search = (period !== Period.All)
      ? { period: period.toString() }
      : {}; /* clear it for all */

    router.navigate({
      search: () => ({ ...search })
    });
  };

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <article className="flex flex-col gap-2 p-2 m-2">
        <PortfolioCard portfolio={portfolio} />
        <PeriodToggle onToggle={onToggle} />
        <HoldingsList holdings={holdings} />
      </article>
    </>
  );
}

export default PortfolioPage;
