import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import HoldingsList from "@/components/holdings/holdingsList.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import type { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import PortfolioCard from "@/components/portfolio/portfolioCard.tsx";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();
  const navigate = useNavigate();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  const onToggle = (period: Period) => {
    navigate({
      search: () => ({ period: period.toString() }),
    });
  };

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <PortfolioCard portfolio={portfolio} />
      <PeriodToggle onToggle={onToggle} />
      <HoldingsList holdings={holdings} />
    </>
  );
}

export default PortfolioPage;
