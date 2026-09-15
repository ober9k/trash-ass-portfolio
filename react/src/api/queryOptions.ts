import { fetchPortfolio, fetchTokens } from "@/api/queryFunctions.ts";

export const portfolioQueryOptions = {
  queryKey: ["me", "portfolio"],
  queryFn:  fetchPortfolio
};

export const tokensQueryOptions = {
  queryKey: ["me", "tokens"],
  queryFn:  fetchTokens
};
