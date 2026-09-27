import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import AssetCardList from "@/components/assets/assetCardList.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle, { type Period } from "@/components/miscellaneous/periodToggle.tsx";
import SummaryCard from "@/components/portfolio/summaryCard.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  const onToggle = (period: Period) => {
    console.log(period);
  };

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <SummaryCard portfolio={portfolio} />
      <PeriodToggle onToggle={onToggle} />
      <AssetCardList holdings={holdings} />
    </>
  );
}

export default PortfolioPage;
