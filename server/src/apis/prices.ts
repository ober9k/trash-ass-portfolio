import { Currency } from "@shared/types/currency";
import { allTickers, Ticker } from "@shared/types/ticker";

export type Price = {
  id:     number,
  name:   string,
  symbol: string,
  slug:   string,
  quotes: Quote[],
};

export type Quote = {
  symbol: string,
  price:  number,
};

const cmcApiKey = process.env["CMC_PRO_API_KEY"] || "";
const cmcApiUrl = process.env["CMC_PRO_API_URL"] || "";

const headers = {
  "x-cmc_pro_api_key": cmcApiKey,
};

function buildApiUrl(): string {
  return [cmcApiUrl, "simple", "price"].join("/");
}

export async function getPrices(tickers: Ticker[] = allTickers, currency: Currency = Currency.AUD): Promise<Price[]> {
  const symbol  = tickers.map((t) => t.toString().toLowerCase()).join(",");
  const convert = currency.toString();

  const result = await fetch(`${buildApiUrl()}?symbol=${symbol}&convert=${convert}`, { headers });
  const json   = await result.json();
  return json.data; /* double nested */
}

export async function getPriceByTicker(ticker: Ticker, currency: Currency = Currency.AUD): Promise<Price> {
  const result = await getPrices([ ticker ], currency);
  return result.pop();
}

export function getQuote(prices: Price[], ticker: Ticker): Quote {
  return prices.find((p) => p.symbol === ticker)
    .quotes[0];
}
