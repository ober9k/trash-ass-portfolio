import type { Currency } from "@shared/types/currency";
import type { Asset } from "@shared/types/portfolio";

export type QuotedAsset = Asset & {
  quote: Quote,
};

export type Quote = {
  currency: Currency,
  price:    number,
  quotedAt: Date,
};

export function mapQuotedAsset(quotedAsset: any): QuotedAsset {
  const quote = flattenQuotes(quotedAsset.quotes);
  delete quotedAsset.quotes; // unused (now empty) value
  return { ...quotedAsset, apiId: quotedAsset.id, quote };
}

/**
 * Flatten the array for the CMC API quotes historical result.
 * We just need the currency and price for later calculation.
 * @param quotes
 */
export function flattenQuotes(quotes: any[]): Quote {
  const { quote, timestamp } = quotes.at(-1);
  const [ currency, { price } ] = Object.entries(quote).at(-1);

  return { currency: currency as Currency, price, quotedAt: new Date(timestamp as string) };
}
