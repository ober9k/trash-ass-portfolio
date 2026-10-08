import { fetchAsset, fetchHoldingByTicker, fetchHoldings, fetchHoldingTransactionsByTicker, fetchPortfolio, fetchTransaction } from "@/api/queryFunctions.ts";
import { Period } from "@shared/types/period";
import type { Ticker } from "@shared/types/ticker.ts";

export type PeriodParams = {
  period: Period,
};

export function buildPortfolioQueryOptions(params: PeriodParams) {
  return {
    queryKey: ["me", "portfolio", params],
    queryFn:  fetchPortfolio,
  };
}

export function buildHoldingsQueryOptions(params: PeriodParams) {
  return {
    queryKey: ["me", "portfolio", "holdings", params],
    queryFn:  fetchHoldings,
  }
}

export function buildHoldingOptions(ticker: Ticker, params: PeriodParams) {
  return {
    queryKey: ["me", "portfolio", "holdings", ticker.toString(), params],
    queryFn:  fetchHoldingByTicker
  };
}

export function buildHoldingTransactionsOptions(ticker: Ticker, params: PeriodParams) {
  return {
    queryKey: ["me", "portfolio", "holdings", ticker.toString(), "transactions", params],
    queryFn:  fetchHoldingTransactionsByTicker,
  };
}

export function buildTransactionOptions(transactionId: string) {
  return {
    queryKey: ["me", "transactions", transactionId],
    queryFn:  fetchTransaction,
  };
}

export function buildAssetQueryOptions(assetId: string) {
  return {
    queryKey: ["assets", assetId],
    queryFn:  fetchAsset,
  };
}

export function buildAssetByTickerQueryOptions(ticker: string) {
  return {
    queryKey: ["assets", "tickers", ticker],
    queryFn:  fetchAsset,
  };
}

