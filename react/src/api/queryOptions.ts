import { fetchHello, fetchPortfolio, fetchTokens, fetchTransactions, fetchTransactionTotal } from "@/api/queryFunctions.ts";

export const helloQueryOptions = {
  queryKey: ["hello"],
  queryFn:  fetchHello
};

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

export const tokenTransactionsTotalOptions = {
  queryKey: ["me", "tokens"], /* expand this with `$tokenId` and `summary` */
  queryFn:  fetchTransactionTotal
};
