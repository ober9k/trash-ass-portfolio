import { fetchPortfolioAsset, fetchPortfolioAssets, fetchPortfolioSummary, fetchTransactions } from "@/api/queryFunctions.ts";
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

export function buildAssetSummaryOptions(ticker: Ticker) {
  return {
    queryKey: ["me", "portfolio", "assets", ticker.toString(), "summary"],
    queryFn:  fetchPortfolioAsset
  };
}

export function buildAssetTransactionsOptions(ticker: Ticker) {
  return {
    queryKey: ["me", "portfolio", "assets", ticker.toString(), "transactions"],
    queryFn:  fetchTransactions,
  };
}
