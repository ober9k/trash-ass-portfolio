import { fetchPortfolio, fetchTokens, fetchTransactions } from "@/api/queryFunctions.ts";

export const portfolioQueryOptions = {
  queryKey: ["me", "portfolio"],
  queryFn:  fetchPortfolio
};

export const tokensQueryOptions = {
  queryKey: ["me", "tokens"],
  queryFn:  fetchTokens
};

export const transactionsQueryOptions = {
  queryKey: ["me", "tokens"], /* expand this with `$tokenId` and `transactions` */
  queryFn:  fetchTransactions
};
