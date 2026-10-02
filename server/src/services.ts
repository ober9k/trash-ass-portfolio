import { fetchAssetByTicker } from "@/apis/assets";
import { getHistoricPrices, getLatestPrices, getPrices, getQuote, type Price } from "@/apis/prices";
import { fetchSummaries } from "@/apis/summaries";
import { buildEmptyHolding, buildEmptyPortfolio } from "@/utils";
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
    p.initialValue += historicQuotedAsset ? s.quantity * historicQuotedAsset.quote.price : s.value;
    p.holdings++;
    return p;
  }, buildEmptyPortfolio());
}

/**
 * Retrieve all associated holdings.
 */
export async function getHoldings(): Promise<Holding[]> {
  const prices = await getPrices();

  const transactions = await fetchTransactions();
  const assets = await fetchAssetsByIds(getDistinctAssetIds(transactions));
  const holdings = [];

  for (let a of assets) {
    const filteredTransactions = transactions.filter((t) => t.assetId === a.id);
    const { price } = getQuote(prices, a.ticker);

    const holding = filteredTransactions.reduce((h, t) => {
      const s = h.summary;
      s.quantity     += t.quantity;
      s.fee          += t.fee;
      s.value        += t.value;
      s.currentValue += t.quantity * price;
      s.averagePrice  = s.value / s.quantity; /* this could just also be calculated at the end */
      return h;
    }, buildEmptyHolding(a));

    holdings.push(holding);
  }

  holdings.sort((a: Holding, b: Holding) => {
    return b.summary.currentValue - a.summary.currentValue;
  });

  return holdings;
}

/**
 * Retrieve holding asset/summary based on the provided ticker.
 * @param ticker
 */
export async function getHoldingByTicker(ticker: string): Promise<Holding> {
  const asset  = await fetchAssetByTicker(ticker);
  const prices = await getPrices([asset.ticker])
  const quote  = await getQuote(prices, asset.ticker);
  const transactions = await fetchTransactionsByAssetId(asset.id);

  return transactions.reduce((h, t) => {
    const s = h.summary;
    s.quantity     += t.quantity;
    s.fee          += t.fee;
    s.value        += t.value;
    s.currentValue += t.quantity * quote.price;
    s.averagePrice  = s.value / s.quantity; /* this could just also be calculated at the end */
    return h;
  }, buildEmptyHolding(asset));
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
