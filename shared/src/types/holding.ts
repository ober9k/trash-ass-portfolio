import { Ticker } from "./ticker";

export type Holding = {
  asset:   HoldingAsset,
  summary: HoldingSummary,
};

export type HoldingAsset = {
  id:     string,
  ticker: Ticker,
  name:   string,
};

export type HoldingSummary = {
  quantity:     number,
  fee:          number,
  value:        number,
  currentValue: number,
  averagePrice: number,
};

export type HoldingTransaction = {
  id:           string,
  price:        number,
  quantity:     number,
  fee:          number,
  value:        number, /* as `total` in database */
  currentValue: number,
  purchasedAt:  Date,
};
