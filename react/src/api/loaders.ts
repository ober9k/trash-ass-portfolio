import { portfolioQueryOptions } from "@/api/queryOptions.ts";
import { type Portfolio } from "@shared/types/portfolio.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio,
};

export async function portfolioLoader({ context }): Promise<PortfolioLoaderProps> {
  return {
    portfolio: await context.queryClient.query(portfolioQueryOptions),
  };
}

