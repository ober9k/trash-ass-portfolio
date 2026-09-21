import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import NavigationMenu from "@/components/layout/navigationMenu";
import PortfolioTotal from "@/components/portfolio/portfolioTotal.tsx";
import TokenDisplay from "@/components/tokens/tokenDisplay.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Menu, User } from "lucide-react";

function PortfolioPage() {
  const { portfolio, tokens }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  const rightItem = (
    <Link to={"/auth/sign-in"}><User size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu rightItem={rightItem}>
        Portfolio
      </NavigationMenu>
      <PortfolioTotal portfolio={portfolio} />
      {tokens.map((token, key) => (
        <TokenDisplay asset={token} key={key} />
      ))}
    </>
  );
}

export default PortfolioPage;
