import { fetchAsset, fetchHoldingByHoldingId, fetchHoldings, fetchHoldingTransactionsByTicker as fetchHoldingTransactionsByHoldingId, fetchPortfolio, fetchTransaction } from "@/api/queryFunctions.ts";
import { Period } from "@shared/types/period";

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
    queryKey: ["me", "holdings", params],
    queryFn:  fetchHoldings,
  }
}

export function buildHoldingOptions(holdingId: string, params: PeriodParams) {
  return {
    queryKey: ["me", "holdings", holdingId, params],
    queryFn:  fetchHoldingByHoldingId
  };
}

export function buildHoldingTransactionsOptions(holdingId: string, params: PeriodParams) {
  return {
    queryKey: ["me", "holdings", holdingId, "transactions", params],
    queryFn:  fetchHoldingTransactionsByHoldingId,
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

