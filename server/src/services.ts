import { fetchAssetById, fetchAssetByTicker, fetchAssetsByIds } from "@/apis/assets";
import { getHistoricPrices, getLatestPrices, getPrices, getQuote } from "@/apis/prices";
import { fetchSummariesByAccountId, fetchSummaryByAccountIdAndAssetId } from "@/apis/summaries";
import { fetchTransactionsByAssetId } from "@/apis/transactions";
import { buildBaseHoldingFromAssetAndSummary, buildEmptyPortfolio } from "@/utils";
import { byApiId } from "@/utils/pricesUtils";
import { calculateQuotedValue, mapApiIds, mapAssetIds } from "@/utils/summariesUtils";
import { Firestore } from "@google-cloud/firestore";
import { Period } from "@shared/types/period";
import type { Holding, Portfolio, Transaction } from "@shared/types/portfolio";

Firestore.name; /* hack: leave in for types (for now) */

/**
 * Retrieve a basic summary of the portfolio.
 */
export async function getPortfolioByAccountId(accountId: string, period: Period): Promise<Portfolio> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchSummariesByAccountId(accountId);
  // const summaries = [];

  if (summaries.length === 0) {
    return buildEmptyPortfolio(); /* fix for handling later case */
  }

  const apiIds = mapApiIds(summaries);
  const currentPrices = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  return summaries.reduce((p, s) => {
    const currentQuotedAsset  = currentPrices.find(byApiId(s.apiId));
    const historicQuotedAsset = historicPrices.find(byApiId(s.apiId));

    p.currentValue  += calculateQuotedValue(s, currentQuotedAsset);
    p.adjustedValue += historicQuotedAsset ? calculateQuotedValue(s, historicQuotedAsset) : s.initialValue;
    p.initialValue  += s.initialValue;
    p.holdings++;
    return p;
  }, buildEmptyPortfolio());
}

/**
 * Retrieve all associated holdings.
 */
export async function getHoldingsByAccountId(accountId: string, period: Period): Promise<Holding[]> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchSummariesByAccountId(accountId);
  // const summaries = [];

  const assetIds = mapAssetIds(summaries);
  const apiIds = mapApiIds(summaries);
  const currentPrices  = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  const assets = await fetchAssetsByIds(assetIds);
  const holdings = [];

  /* TODO: initial to check it works, need to tidy up */
  for (let a of assets) {
    const s = summaries.find((t) => t.assetId === a.id);
    const currentQuotedAsset  = currentPrices.find(byApiId(s.apiId));
    const historicQuotedAsset = historicPrices.find(byApiId(s.apiId));

    const holding = buildBaseHoldingFromAssetAndSummary(a, s);
    holding.summary.currentValue  += calculateQuotedValue(s, currentQuotedAsset);
    holding.summary.adjustedValue += historicQuotedAsset ? calculateQuotedValue(s, historicQuotedAsset) : s.initialValue;
    holding.summary.initialValue  += s.initialValue;

    holdings.push(holding);
  }

  holdings.sort((a: Holding, b: Holding) => {
    return b.summary.currentValue - a.summary.currentValue;
  });

  return holdings;
}

/**
 * Retrieve holding asset/summary based on the provided ticker.
 */
export async function getHoldingByAccountIdAndAssetId(accountId: string, assetId: string): Promise<Holding> {
  const asset   = await fetchAssetById(assetId);
  const summary = await fetchSummaryByAccountIdAndAssetId(accountId, assetId);
  const currentPrices = await getLatestPrices([asset.apiId]);
  const currentQuotedAsset = currentPrices.find(byApiId(asset.apiId));

  const holding = buildBaseHoldingFromAssetAndSummary(asset, summary);
  holding.summary.currentValue = calculateQuotedValue(summary, currentQuotedAsset);

  return holding;
}

/**
 Retrieve holding transactions based on the provided ticker.
 * @param ticker
 */
export async function getHoldingTransactionsByTicker(ticker: string): Promise<Transaction[]> {
  const asset  = await fetchAssetByTicker(ticker);
  const prices = await getPrices([asset.ticker])
  const quote  = await getQuote(prices, asset.ticker);
  const transactions = await fetchTransactionsByAssetId(asset.id);

  return transactions.map((t) => ({
    ...t, currentValue: t.quantity * quote.price,
  }));
}
