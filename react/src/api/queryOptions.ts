import { fetchHoldingByTicker, fetchPortfolioAssets, fetchPortfolioSummary, fetchHoldingTransactionsByTicker } from "@/api/queryFunctions.ts";
import type { Ticker } from "@shared/types/ticker.ts";

export function buildPortfolioSummaryQueryOptions() {
  return {
    queryKey: ["me", "portfolio", "summary"],
    queryFn:  fetchPortfolioSummary,
  };
}

export function buildPortfolioAssetsQueryOptions() {
  return {
    queryKey: ["me", "portfolio", "assets"],
    queryFn:  fetchPortfolioAssets,
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
