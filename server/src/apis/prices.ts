import { getTimePeriodInterval } from "@/utils";
import { Currency } from "@shared/types/currency";
import { Period } from "@shared/types/period";
import { allTickers, Ticker } from "@shared/types/ticker";
import type { QuotedAsset } from "../../utils/apiUtils";
import { mapQuotedAsset } from "../../utils/apiUtils";

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

function buildApiUrl2(): string {
  return ["https://pro-api.coinmarketcap.com/v3", "cryptocurrency", "quotes", "historical"].join("/");
}

export async function getPrices(tickers: Ticker[] = allTickers, currency: Currency = Currency.AUD): Promise<Price[]> {
  const symbol  = tickers.map((t) => t.toString().toLowerCase()).join(",");
  const convert = currency.toString();

  const result = await fetch(`${buildApiUrl()}?symbol=${symbol}&convert=${convert}`, { headers });
  const json   = await result.json();
  return json.data; /* double nested */
}

export async function getLatestPrices(ids: number[], currency = Currency.AUD): Promise<QuotedAsset[]> {
  const url = new URL(buildApiUrl2());
  const urlSearchParams = new URLSearchParams({
    id:      ids.map((t) => t.toString()).join(","),
    convert: currency.toString(),
    count:   "1",
    aux:     "price",
  });

  const result = await fetch(`${url}?${urlSearchParams}`, { headers });
  const json   = await result.json();
  const data   = json.data;

  return Object.values(data)
    .map(mapQuotedAsset);
}

export async function getHistoricPrices(ids: number[], period: Period, currency = Currency.AUD): Promise<QuotedAsset[]> {
  const url = new URL(buildApiUrl2());
  const urlSearchParams = new URLSearchParams({
    "id":         ids.map((t) => t.toString()).join(","),
    "convert":    currency.toString(),
    "count":      "1",
    "aux":        "price",
    ...getHistoricQueryParams(period)
  });

  const result = await fetch(`${url}?${urlSearchParams}`, { headers });
  const json   = await result.json();
  const data   = json.data;

  return Object.values(data)
    .map(mapQuotedAsset);
}

export async function getHistoricalPrices(ids: number[], currency: Currency = Currency.AUD, timeStart: Date = new Date(), timeEnd: Date = new Date()): Promise<Price[]> {
  const url = new URL(buildApiUrl2());
  const urlSearchParams = new URLSearchParams({
    "id":         ids.map((t) => t.toString()).join(","),
    "convert":    currency.toString(),
    "time_start": timeStart.toISOString(),
    "time_end":   timeEnd.toISOString(),
    "count":      "1000",
    "interval":   getTimePeriodInterval(timeStart, timeEnd),
  });

  const result = await fetch(`${url}?${urlSearchParams}`, { headers });
  const json   = await result.json();
  const data   = json.data;

  return ids.map((id) => {
    const d = data[id.toString()];
          d.quotes = [ d.quotes.shift(), d.quotes.pop() ]; // just give a start value and end value

    return {
      ...d,
    };
  }).flat();
}

export async function getPriceByTicker(ticker: Ticker, currency: Currency = Currency.AUD): Promise<Price> {
  const result = await getPrices([ ticker ], currency);
  return result.pop();
}

export function getQuote(prices: Price[], ticker: Ticker): Quote | null {
  const price = prices.find((p) => p.symbol === ticker);

  return (price)
    ? price.quotes[0]
    : null;
}

type HistoricQueryParams = {
  time_start: string, /* matched to API naming and only need time_start */
  interval:   string,
};

export function getHistoricQueryParams(period: Period): HistoricQueryParams {
  const timeStart = new Date();
  const interval = (period === Period.OneHour || period === Period.OneDay)
    ? "hourly"
    : "daily";

  switch (period) {
    case Period.OneHour:
      timeStart.setHours(timeStart.getHours() - 1);
      break;
    case Period.OneDay:
      timeStart.setHours(timeStart.getHours() - 1 - 24); /* round it down */
      break;
    case Period.OneWeek:
      timeStart.setDate(timeStart.getDate() - 7);
      break;
    case Period.OneMonth:
      timeStart.setMonth(timeStart.getMonth() - 1);
      break;
    case Period.OneYear:
      timeStart.setMonth(timeStart.getMonth() - 12);
      break;
    default:
      throw new Error(`Unsupported period: ${period}`);
  }

  /* reset unused values */
  timeStart.setMinutes(0);
  timeStart.setSeconds(0);
  timeStart.setMilliseconds(0);

  return { time_start: timeStart.toISOString(), interval };
}
