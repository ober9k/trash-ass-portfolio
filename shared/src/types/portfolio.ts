import { Ticker } from "./ticker";

export type Portfolio = {
  total:       number,
  currency:    string,
  gainTotal:   number,
  gainPercent: number,
};

export type PortfolioSummary = {
  currentValue:  number,
  purchaseValue: number,
}

export type PortfolioAsset = {
  name:    string,
  ticker:  Ticker,
  summary: Summary,
};

export type Summary = {
  quantity: number,
  total:    number,
  fee:      number,
  average:  number,
  value:    number,
};
