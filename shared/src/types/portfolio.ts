import { Ticker } from "./ticker";

export type Portfolio = {
  value:        number,
  currentValue: number,
  holdings:     number,
}

export type Holding = {
  asset:   Asset,
  summary: Summary,
};

export type Asset = {
  id:     string,
  ticker: Ticker,
  name:   string,
};

export type Summary = {
  quantity:     number,
  fee:          number,
  value:        number,
  currentValue: number,
  averagePrice: number,
};

export type Transaction = {
  id:           string,
  price:        number,
  quantity:     number,
  fee:          number,
  value:        number, /* as `total` in database */
  currentValue: number,
  purchasedAt:  Date,
};
