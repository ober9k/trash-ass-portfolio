import { transactions } from "@/data/mock/transactions";
import type { Price } from "@shared/types/price";

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
  const prices = await getPrices();
  const tokens = getTokens();
  // console.log(prices[0]);
  console.log(tokens);

  const getQuote = (symbol: string): number => {
    return prices.find((price) => price.symbol === symbol.toUpperCase())
      .quotes[0]
      .price;
  }

  const getTotal = (symbol: string): number => {
    const price = getQuote(symbol);
    const token = tokens.find((token) => token.symbol === symbol)

    return price * token.quantity;
  };

  let total = 0;

  tokens.forEach((token) => {
    total += getTotal(token.symbol);
  });

  return {
    total,
  };
}

export function getTokens() {
  return transactions.reduce((acc, cur) => {
    let token = acc.find((x) => x.symbol === cur.symbol);

    if (token) {
      token.quantity += cur.quantity;
      token.fee      += cur.fee;
      token.total    += cur.total;
    }
    else {
      acc.push({ ...cur });
    }

    return acc;
  }, []);
}