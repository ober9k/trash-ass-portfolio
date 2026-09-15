import { portfolioQueryOptions, tokensQueryOptions } from "@/api/queryOptions.ts";
import { type Portfolio } from "@shared/types/portfolio.ts";
import type { Token } from "@shared/types/token.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio,
  tokens:    Token[],
};

export async function portfolioLoader({ context }): Promise<PortfolioLoaderProps> {
  return {
    portfolio: await context.queryClient.query(portfolioQueryOptions),
    tokens:    await context.queryClient.query(tokensQueryOptions),
  };
}

