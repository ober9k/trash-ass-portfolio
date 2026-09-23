import { buildAssetSummaryOptions, buildAssetTransactionsOptions, buildPortfolioAssetsQueryOptions, buildPortfolioSummaryQueryOptions } from "@/api/queryOptions.ts";
import type { PortfolioAsset, PortfolioSummary } from "@shared/types/portfolio.ts";
import type { Transaction } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  portfolioSummary: PortfolioSummary,
  portfolioAssets:  PortfolioAsset[],
};

export type TransactionsLoaderProps = {
  transactions:   Transaction[],
  portfolioAsset: PortfolioAsset,
};

export async function portfolioLoader({ context }): Promise<PortfolioLoaderProps> {
  return {
    portfolioSummary: await context.queryClient.query(buildPortfolioSummaryQueryOptions()),
    portfolioAssets:  await context.queryClient.query(buildPortfolioAssetsQueryOptions()),
  };
}

export async function transactionsLoader({ context, params }): Promise<TransactionsLoaderProps> {
  const ticker = params.tokenId.toUpperCase(); /* add validation */

  return {
    portfolioAsset: await context.queryClient.query(buildAssetSummaryOptions(ticker)),
    transactions:   await context.queryClient.query(buildAssetTransactionsOptions(ticker)),
  };
}

