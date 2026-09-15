import type { PortfolioLoaderProps } from "@/api/loaders.ts";
import PortfolioTotal from "@/components/portfolio/portfolioTotal.tsx";
import { getRouteApi } from "@tanstack/react-router";

function PortfolioPage() {
  const { portfolio }: PortfolioLoaderProps = getRouteApi("/").useLoaderData();

  return (
    <>
      <h1>Portfolio</h1>
      <PortfolioTotal portfolio={portfolio} />
    </>
  );
}

export default PortfolioPage;
