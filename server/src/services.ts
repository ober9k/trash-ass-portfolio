import { fetchAssetByTicker, fetchAssets } from "@/apis/assets";
import { fetchTransactionsByAssetId } from "@/apis/transactions";
import { buildEmptyHolding } from "@/utils";
import { Firestore } from "@google-cloud/firestore";
import { Currency } from "@shared/types/currency";
import type { Holding, HoldingTransaction } from "@shared/types/holding";
import type { PortfolioAsset } from "@shared/types/portfolio";
import { type PortfolioSummary } from "@shared/types/portfolio";
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

export async function getPortfolio() {
  const assets = await getPortfolioAssets();

  let total = 0;

  assets.forEach((a) => {
    total += a.summary.value;
  });

  const currency    = Currency.AUD; /* TODO: temporary data */
  const gainTotal   = 1; /* TODO: temporary data */
  const gainPercent = 1; /* TODO: temporary data */

  return {
    total, currency, gainTotal, gainPercent,
  };
}

/**
 * initial simplified handling (unsafe)
 * TODO: this duplicates the other part for now
 */
export async function getPortfolioSummary(): Promise<PortfolioSummary> {
  const assets = await getPortfolioAssets();

  const summary = assets.reduce((acc, cur) => {
    acc.currentValue  += cur.summary.value;
    acc.purchaseValue += cur.summary.total;
    return acc;
  }, { currentValue: 0, purchaseValue: 0 });

  return summary;
}

export async function getPortfolioAssets(): Promise<PortfolioAsset[]> {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const assets = await fetchAssets();

  for (let a of assets) {
    const transactions = await fetchTransactionsByAssetId(a.id);

    // a.transactions = transactions;
    a.summary = transactions.reduce((acc, cur) => {
      acc.quantity += cur.quantity;
      acc.total    += cur.total;
      acc.fee      += cur.fee;
      acc.average   = acc.total / acc.quantity;
      return acc;
    }, { quantity: 0, total: 0, fee: 0, average: 0, value: 0 });

    a.summary.value = (a.summary.quantity * getQuote(a.ticker.toLowerCase()))
  }

  assets.sort((a: PortfolioAsset, b: PortfolioAsset) => {
    return b.summary.value - a.summary.value;
  });

  return assets;
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
export async function getHoldingTransactionsByTicker(ticker: string): Promise<HoldingTransaction[]> {
  const asset = await fetchAssetByTicker(ticker);
  const quote = await getAssetQuote(asset.ticker);
  const transactions = await fetchTransactionsByAssetId(asset.id);

  return transactions.map((t) => ({
    ...t, currentValue: t.quantity * quote.price,
  }));
}
