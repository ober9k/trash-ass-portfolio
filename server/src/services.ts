import { fetchAssetByTicker, fetchAssets } from "@/apis/assets";
import { fetchTransactions, fetchTransactionsByAssetId } from "@/apis/transactions";
import { Firestore } from "@google-cloud/firestore";
import { Currency } from "@shared/types/currency";
import type { PortfolioAsset } from "@shared/types/portfolio";
import { type PortfolioSummary } from "@shared/types/portfolio";
import type { Price } from "@shared/types/price";
import { Ticker } from "@shared/types/ticker";
import { type AssetTransaction } from "@shared/types/transaction";

Firestore.name; /* hack: leave in for types (for now) */

const cmcApiKey = process.env["CMC_PRO_API_KEY"] || "";
const cmcApiUrl = process.env["CMC_PRO_API_URL"] || "";

function buildApiUrl(): string {
  return [cmcApiUrl, "simple", "price"].join("/");
}

export async function getPrices(): Promise<Price[]> {
  const result = await fetch(`${buildApiUrl()}?symbol=ada,axs,doge,hype,neo,pepe,sol,spx,vet,xlm,xrp,zbcn,zec&convert=aud`, {
    headers: {
      "x-cmc_pro_api_key": cmcApiKey,
    }
  });

  const json = await result.json();
  return json.data; /* double nested */
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
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const assets = await fetchAssets();
  const transactions = await fetchTransactions();

  assets.forEach((a) => {
    const filteredTransactions = transactions.filter((t) => t.assetId === a.id);

    // a.transactions = transactions;
    a.summary = filteredTransactions.reduce((acc, cur) => {
      acc.quantity += cur.quantity;
      acc.total    += cur.total;
      acc.fee      += cur.fee;
      acc.average   = acc.total / acc.quantity;
      return acc;
    }, { quantity: 0, total: 0, fee: 0 });

    a.summary.value = (a.summary.quantity * getQuote(a.ticker.toLowerCase()))
  });

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
  const transactions = await fetchTransactions();

  assets.forEach((a) => {
    const filteredTransactions = transactions.filter((t) => t.assetId === a.id);

    // a.transactions = transactions;
    a.summary = filteredTransactions.reduce((acc, cur) => {
      acc.quantity += cur.quantity;
      acc.total    += cur.total;
      acc.fee      += cur.fee;
      acc.average   = acc.total / acc.quantity;
      return acc;
    }, { quantity: 0, total: 0, fee: 0 });

    a.summary.value = (a.summary.quantity * getQuote(a.ticker.toLowerCase()))
  });

  assets.sort((a: PortfolioAsset, b: PortfolioAsset) => {
    return b.summary.value - a.summary.value;
  });

  return assets;
}

export async function getPortfolioAssetSummary(assetId: Ticker): Promise<PortfolioAsset> {
  const assets = await getPortfolioAssets();

  return assets
    .filter((a) => a.ticker === assetId)
    .pop();
}


/**
 * initial simplified handling (unsafe)
 * TODO: this duplicates the other part for now
 * TODO: this is copy pasted and not even remotely close to being optimized
 * @param assetId
 */
export async function getPortfolioAssetTransactions(assetId: string): Promise<AssetTransaction[]> {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const asset = await fetchAssetByTicker(assetId);
  const dbTransactions = await fetchTransactionsByAssetId(asset.id);

  const transactions = dbTransactions.map((t) => {
    delete t.accountId;
    delete t.assetId;

    return {
      ...t,
      asset: asset,
      currentValue: t.quantity * getQuote(asset.ticker.toLowerCase()),
    } as AssetTransaction;
  });

  return transactions;
}
