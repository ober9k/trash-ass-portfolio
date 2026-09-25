import { buildHoldingOptions, buildHoldingTransactionsOptions, buildPortfolioAssetsQueryOptions, buildPortfolioSummaryQueryOptions } from "@/api/queryOptions.ts";
import type { Holding, HoldingTransaction } from "@shared/types/holding.ts";
import type { PortfolioAsset, PortfolioSummary } from "@shared/types/portfolio.ts";
import type { Ticker } from "@shared/types/ticker.ts";

export type PortfolioLoaderProps = {
  portfolioSummary: PortfolioSummary,
  portfolioAssets:  PortfolioAsset[],
};

export type HoldingLoaderProps = {
  holding:             Holding,
  holdingTransactions: HoldingTransaction[],
};

export async function rootBeforeLoader(): Promise<string> {
  return "rootBeforeLoader";
}

export async function portfolioLoader({ context }: any): Promise<PortfolioLoaderProps> {
  return {
    portfolioSummary: await context.queryClient.query(buildPortfolioSummaryQueryOptions()),
    portfolioAssets:  await context.queryClient.query(buildPortfolioAssetsQueryOptions()),
  };
}

export async function transactionsLoader({ context, params }: any): Promise<HoldingLoaderProps> {
  const ticker = params.tokenId.toUpperCase() as Ticker; /* add validation */

  return {
    holding:             await context.queryClient.query(buildHoldingOptions(ticker)),
    holdingTransactions: await context.queryClient.query(buildHoldingTransactionsOptions(ticker)),
  };
}

