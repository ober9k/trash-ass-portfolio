import { fetchHello, fetchPortfolio, fetchPortfolioAssets, fetchTransactions, fetchTransactionTotal } from "@/api/queryFunctions.ts";

export const helloQueryOptions = {
  queryKey: ["hello"],
  queryFn:  fetchHello
};

export const portfolioQueryOptions = {
  queryKey: ["me", "portfolio"],
  queryFn:  fetchPortfolio
};

export const portfolioAssetsQueryOptions = {
  queryKey: ["me", "portfolio", "assets"],
  queryFn:  fetchPortfolioAssets
};

export const transactionsQueryOptions = {
  queryKey: ["me", "tokens"], /* expand this with `$tokenId` and `transactions` */
  queryFn:  fetchTransactions
};

export const tokenTransactionsTotalOptions = {
  queryKey: ["me", "tokens"], /* expand this with `$tokenId` and `summary` */
  queryFn:  fetchTransactionTotal
};
