import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import AssetCardList from "@/components/assets/assetCardList.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import SummaryCard from "@/components/portfolio/summaryCard.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, holdings }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <SummaryCard portfolio={portfolio} />
      <AssetCardList holdings={holdings} />
    </>
  );
}

export default PortfolioPage;
