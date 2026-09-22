import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import NavigationMenu from "@/components/layout/navigationMenu";
import SummaryCard from "@/components/portfolio/summaryCard.tsx";
import TokenDisplay from "@/components/tokens/tokenDisplay.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, portfolioSummary, portfolioAssets }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <SummaryCard summary={portfolioSummary} />
      {portfolioAssets.map((asset, key) => (
        <TokenDisplay asset={asset} key={key} />
      ))}
    </>
  );
}

export default PortfolioPage;
