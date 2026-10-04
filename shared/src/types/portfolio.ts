import { Ticker } from "./ticker";

export type Portfolio = {
  initialValue: number,
  currentValue: number,
  holdings:     number,
}

export type Holding = {
  asset:   Asset,
  summary: Summary,
};

export type Asset = {
  id:     string,
  apiId:  number,
  ticker: Ticker,
  name:   string,
};

export type Summary = {
  quantity:     number,
  fee:          number,
  initialValue: number,
  currentValue: number,
  averagePrice: number,
};

export type Transaction = {
  id:           string,
  price:        number,
  quantity:     number,
  fee:          number,
  value:        number, /* TODO: address inconsistency with `total` in database */
  initialValue: number, /* as `total` in database */
  currentValue: number,
  purchasedAt:  Date,
};
