import { fetchAssetByTicker, fetchAssetsByIds } from "@/apis/assets";
import { fetchTransactions, fetchTransactionsByAssetId } from "@/apis/transactions";
import { buildEmptyHolding, buildEmptyPortfolio, getDistinctAssetIds } from "@/utils";
import { Firestore } from "@google-cloud/firestore";
import { Currency } from "@shared/types/currency";
import type { Holding, Portfolio, Transaction } from "@shared/types/portfolio";
import type { Price } from "@shared/types/price";
import { Ticker } from "@shared/types/ticker";

Firestore.name; /* hack: leave in for types (for now) */

const cmcApiKey = process.env["CMC_PRO_API_KEY"] || "";
const cmcApiUrl = process.env["CMC_PRO_API_URL"] || "";

function buildApiUrl(): string {
  return [cmcApiUrl, "simple", "price"].join("/");
}

const headers = {
  "x-cmc_pro_api_key": cmcApiKey,
};

export async function getPrices(): Promise<Price[]> {
  const result = await fetch(`${buildApiUrl()}?symbol=ada,axs,doge,hype,neo,pepe,sol,spx,vet,xlm,xrp,zbcn,zec&convert=aud`, { headers });
  const json   = await result.json();
  return json.data; /* double nested */
}

/**
 * Retrieve the quote for a single asset.
 * @param ticker
 * @param currency
 */
export async function getAssetQuote(ticker: Ticker, currency: Currency = Currency.AUD): Promise<{ symbol: string, price: number }> {
  const result = await fetch(`${buildApiUrl()}?symbol=${ticker.toString()}&convert=${currency.toString()}`, { headers });
  const json   = await result.json();
  return json.data.pop().quotes.pop(); /* double nested */
}

/**
 * Retrieve a basic summary of the portfolio.
 */
export async function getPortfolio(): Promise<Portfolio> {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const transactions = await fetchTransactions();
  const assets = await fetchAssetsByIds(getDistinctAssetIds(transactions));
  const holdings = [];

  for (let a of assets) {
    const filteredTransactions = transactions.filter((t) => t.assetId === a.id);

    const holding = filteredTransactions.reduce((h, t) => {
      const s = h.summary;
      s.quantity     += t.quantity;
      s.fee          += t.fee;
      s.value        += t.value;
      s.currentValue += t.quantity * getQuote(a.ticker);
      s.averagePrice  = s.value / s.quantity; /* this could just also be calculated at the end */
      return h;
    }, buildEmptyHolding(a));

    holdings.push(holding);
  }

  return holdings.reduce((p, h) => {
    p.value        += h.summary.value;
    p.currentValue += h.summary.currentValue;
    p.holdings++;
    return p;
  }, buildEmptyPortfolio())
}

/**
 * Retrieve all assocated holdings.
 */
export async function getHoldings(): Promise<Portfolio[]> {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const transactions = await fetchTransactions();
  const assets = await fetchAssetsByIds(getDistinctAssetIds(transactions));
  const holdings = [];

  for (let a of assets) {
    const filteredTransactions = transactions.filter((t) => t.assetId === a.id);

    const holding = filteredTransactions.reduce((h, t) => {
      const s = h.summary;
      s.quantity     += t.quantity;
      s.fee          += t.fee;
      s.value        += t.value;
      s.currentValue += t.quantity * getQuote(a.ticker);
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
  const asset = await fetchAssetByTicker(ticker);
  const quote = await getAssetQuote(asset.ticker);
  const transactions = await fetchTransactionsByAssetId(asset.id);

  return transactions.reduce((h, t) => {
    console.log("t", t);

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
  const asset = await fetchAssetByTicker(ticker);
  const quote = await getAssetQuote(asset.ticker);
  const transactions = await fetchTransactionsByAssetId(asset.id);

  return transactions.map((t) => ({
    ...t, currentValue: t.quantity * quote.price,
  }));
}
