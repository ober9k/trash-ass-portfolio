import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import NavigationMenu from "@/components/layout/navigationMenu";
import PortfolioCard from "@/components/portfolio/portfolioCard.tsx";
import TokenDisplay from "@/components/tokens/tokenDisplay.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, portfolioAssets }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        My Portfolio
      </NavigationMenu>
      <PortfolioCard portfolio={portfolio} />
      {portfolioAssets.map((asset, key) => (
        <TokenDisplay asset={asset} key={key} />
      ))}
    </>
  );
}

export default PortfolioPage;
