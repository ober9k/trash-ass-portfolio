import { fetchAssetById, fetchAssetByTicker, fetchAssetsByIds } from "@/apis/assets";
import { getHistoricPrices, getLatestPrices, getPrices, getQuote } from "@/apis/prices";
import { fetchSummaries, fetchSummaryByAssetId } from "@/apis/summaries";
import { fetchTransactionsByAssetId } from "@/apis/transactions";
import { buildBaseHoldingFromAssetAndSummary, buildEmptyPortfolio } from "@/utils";
import { Firestore } from "@google-cloud/firestore";
import { Period } from "@shared/types/period";
import type { Holding, Portfolio, Transaction } from "@shared/types/portfolio";

Firestore.name; /* hack: leave in for types (for now) */

/**
 * Retrieve a basic summary of the portfolio.
 */
export async function getPortfolio(period: Period): Promise<Portfolio> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchSummaries();
  // const summaries = [];

  if (summaries.length === 0) {
    return buildEmptyPortfolio(); /* fix for handling later case */
  }

  const apiIds = summaries.map((s) => s.apiId);
  const latestPrices = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  return summaries.reduce((p, s) => {
    const latestQuotedAsset = latestPrices.find((p) => p.apiId === s.apiId);
    const historicQuotedAsset = historicPrices.find((p) => p.apiId === s.apiId);

    p.currentValue += s.quantity * latestQuotedAsset.quote.price;
    p.initialValue += historicQuotedAsset ? s.quantity * historicQuotedAsset.quote.price : s.initialValue;
    p.holdings++;
    return p;
  }, buildEmptyPortfolio());
}

/**
 * Retrieve all associated holdings.
 */
export async function getHoldings(period: Period): Promise<Holding[]> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchSummaries();
  // const summaries = [];

  const apiIds = summaries.map((s) => s.apiId);
  const assetIds = summaries.map((s) => s.assetId);
  const latestPrices = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  const assets = await fetchAssetsByIds(assetIds);
  const holdings = [];

  /* TODO: initial to check it works, need to tidy up */
  for (let a of assets) {
    const s = summaries.find((t) => t.assetId === a.id);
    const latestQuotedAsset = latestPrices.find((p) => p.apiId === a.apiId);
    const historicQuotedAsset = historicPrices.find((p) => p.apiId === a.apiId);

    const holding = buildBaseHoldingFromAssetAndSummary(a, s);
    holding.summary.initialValue = historicQuotedAsset ? s.quantity * historicQuotedAsset.quote.price : s.initialValue;
    holding.summary.currentValue = s.quantity * latestQuotedAsset.quote.price;

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
  const summary = await fetchSummaryByAssetId(asset.id);
  const latestPrices = await getLatestPrices([asset.apiId]);
  const latestQuotedAsset = latestPrices.find((p) => p.apiId === asset.apiId);

  const holding = buildBaseHoldingFromAssetAndSummary(asset, summary);
  holding.summary.currentValue = summary.quantity * latestQuotedAsset.quote.price;

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

