import { fetchAssets } from "@/apis/assets";
import { fetchTransactions } from "@/apis/transactions";
import { transactions } from "@/data/mock/transactions";
import { Currency } from "@shared/types/currency";
import { type PortfolioSummary } from "@shared/types/portfolio";
import type { PortfolioAsset, Summary } from "@shared/types/portfolio";
import type { Price } from "@shared/types/price";
import { Token } from "@shared/types/token";
import type { TransactionTotal } from "@shared/types/transaction";
import { TransactionType } from "@shared/types/transaction";
import { getTokenName } from "../utils/tokenUtils";
import { Firestore } from "@google-cloud/firestore";

Firestore.name; /* hack: leave in for types (for now) */

export async function getPrices(): Promise<Price[]> {
  const result = await fetch('https://pro-api.coinmarketcap.com/v2/simple/price?symbol=ada,doge,hype,neo,pepe,vet,xlm,zbcn,zec&convert=aud', {
    headers: {
      'x-cmc_pro_api_key': ''
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

/**
 * initial simplified handling (unsafe)
 * @param tokenId
 */
export async function getTransactionsByTokenId(tokenId: string) {
  return transactions.filter((transaction) => {
    return transaction.symbol === tokenId;
  }).map((transaction) => ({
    /* temporary fix whilst tidying up naming */
    ...transaction,
    token: transaction.symbol,
  }));
}

/**
 * Generate a summary of values for a token.
 * TODO: this is just roughly built for the prototyping
 * @param tokenId
 */
export async function getTransactionsSummary(tokenId: string) {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.symbol === tokenId;
  });

  const totalQuantity = filteredTransactions.reduce((acc, cur) => acc + cur.quantity, 0);

  const buyTransactions = filteredTransactions
    .filter((t) => t.transactionType === TransactionType.Buy);

  const buyTotal = buyTransactions
    .reduce((a, c) => a + (c.quantity * c.price), 0);


  const totalTransaction: TransactionTotal = {
    token:        tokenId as Token,
    name:         getTokenName(tokenId as Token),
    quantity:     totalQuantity,
    marketValue:  totalQuantity * getQuote(tokenId),
    totalValue:   buyTotal,
    buyAverage:   buyTotal / buyTransactions.length,
    buyTotal:     buyTotal,
    transactions: filteredTransactions.length,
  };

  return totalTransaction;
}
