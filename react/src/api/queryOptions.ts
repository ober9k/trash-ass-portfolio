import { fetchPortfolio } from "@/api/queryFunctions.ts";

export const portfolioQueryOptions = {
  queryKey: ["me", "portfolio"],
  queryFn:  fetchPortfolio
};
