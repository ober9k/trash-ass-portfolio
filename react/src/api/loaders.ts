import { buildAssetSummaryOptions, buildAssetTransactionsOptions, buildPortfolioAssetsQueryOptions, buildPortfolioSummaryQueryOptions } from "@/api/queryOptions.ts";
import type { PortfolioAsset, PortfolioSummary } from "@shared/types/portfolio.ts";
import type { Ticker } from "@shared/types/ticker.ts";
import { type AssetTransaction } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  portfolioSummary: PortfolioSummary,
  portfolioAssets:  PortfolioAsset[],
};

export type TransactionsLoaderProps = {
  portfolioAsset: PortfolioAsset,
  transactions:   AssetTransaction[],
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

export async function transactionsLoader({ context, params }: any): Promise<TransactionsLoaderProps> {
  const ticker = params.tokenId.toUpperCase() as Ticker; /* add validation */
  console.log("params", params);

  return {
    portfolioAsset: await context.queryClient.query(buildAssetSummaryOptions(ticker)),
    transactions:   await context.queryClient.query(buildAssetTransactionsOptions(ticker)),
  };
}

