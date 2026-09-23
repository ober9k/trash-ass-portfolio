import { fetchHello, fetchPortfolioAsset, fetchPortfolioAssets, fetchPortfolioSummary, fetchTransactions } from "@/api/queryFunctions.ts";

export const helloQueryOptions = {
  queryKey: ["hello"],
  queryFn:  fetchHello
};

export const portfolioSummaryQueryOptions = {
  queryKey: ["me", "portfolio", "summary"],
  queryFn:  fetchPortfolioSummary
};

export const portfolioAssetsQueryOptions = {
  queryKey: ["me", "portfolio", "assets"],
  queryFn:  fetchPortfolioAssets
};

export const transactionsQueryOptions = {
  queryKey: ["me", "portfolio", "assets"], /* expand this with `$tokenId` and `transactions` */
  queryFn:  fetchTransactions
};

export const portfolioAssetQueryOptions = {
  queryKey: ["me", "portfolio", "assets"], /* expand this with `$tokenId` and `summary` */
  queryFn:  fetchPortfolioAsset
};
