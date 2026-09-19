import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import PortfolioTotal from "@/components/portfolio/portfolioTotal.tsx";
import TokenDisplay from "@/components/tokens/tokenDisplay.tsx";
import { getRouteApi } from "@tanstack/react-router";

function PortfolioPage() {
  const { portfolio, tokens }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  console.log(tokens);

  return (
    <>
      <h1>Portfolio</h1>
      <PortfolioTotal portfolio={portfolio} />
      {tokens.map((token, key) => (
        <TokenDisplay asset={token} key={key} />
      ))}
    </>
  );
}

export default PortfolioPage;
