import { transactions } from "@/data/mock/transactions";
import type { Price } from "@shared/types/price";
import { type SymbolType } from "@shared/types/token";
import type { TransactionTotal } from "@shared/types/transaction";
import { TransactionType } from "@shared/types/transaction";
import { getTokenName } from "../utils/tokenUtils";

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
  const tokens = await getTokens();

  let total = 0;

  tokens.forEach((token) => {
    total += token.value;
  });

  const currency    = "AUD"; /* TODO: temporary data */
  const gainTotal   = 1; /* TODO: temporary data */
  const gainPercent = 1; /* TODO: temporary data */

  return {
    total, currency, gainTotal, gainPercent,
  };
}

export async function getTokens() {
  const prices = await getPrices();

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  /* mix price handling into here */
  const tokens = transactions.reduce((acc, cur) => {
    let token = acc.find((x) => x.symbol === cur.symbol);

    if (token) {
      token.quantity += cur.quantity;
      token.fee      += cur.fee;
      token.total    += cur.total;
    }
    else {
      acc.push({
        symbol:   cur.symbol,
        name:     getTokenName(cur.symbol),
        quantity: cur.quantity,
        fee:      cur.fee,
        total:    cur.total,
      });
    }

    return acc;
  }, []);

  tokens.forEach((token) => {
    token.average = (token.total / token.quantity);
    token.value   = (token.quantity * getQuote(token.symbol));
  });

  tokens.sort((tokenA, tokenB) => {
    return tokenB.value - tokenA.value;
  });

  return tokens;
}

/**
 * initial simplified handling (unsafe)
 * @param tokenId
 */
export async function getTransactionsByTokenId(tokenId: string) {
  return transactions.filter((transaction) => {
    return transaction.symbol === tokenId;
  });
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
    symbol:       tokenId as SymbolType,
    name:         getTokenName(tokenId as SymbolType),
    quantity:     totalQuantity,
    marketValue:  totalQuantity * getQuote(tokenId),
    totalValue:   buyTotal,
    buyAverage:   buyTotal / buyTransactions.length,
    buyTotal:     buyTotal,
    transactions: filteredTransactions.length,
  };

  return totalTransaction;
}
