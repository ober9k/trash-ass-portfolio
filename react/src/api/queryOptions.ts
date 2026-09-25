import { fetchHoldingByTicker, fetchHoldings, fetchPortfolio, fetchHoldingTransactionsByTicker } from "@/api/queryFunctions.ts";
import type { Ticker } from "@shared/types/ticker.ts";

export function buildPortfolioQueryOptions() {
  return {
    queryKey: ["me", "portfolio"],
    queryFn:  fetchPortfolio,
  };
}

export function buildHoldingsQueryOptions() {
  return {
    queryKey: ["me", "portfolio", "holdings"],
    queryFn:  fetchHoldings,
  }
}

export function buildHoldingOptions(ticker: Ticker) {
  return {
    queryKey: ["me", "portfolio", "holdings", ticker.toString()],
    queryFn:  fetchHoldingByTicker
  };
}

export function buildHoldingTransactionsOptions(ticker: Ticker) {
  return {
    queryKey: ["me", "portfolio", "holdings", ticker.toString(), "transactions"],
    queryFn:  fetchHoldingTransactionsByTicker,
  };
}
