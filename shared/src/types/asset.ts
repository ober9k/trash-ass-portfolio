import { Ticker } from "./ticker";

export type Asset = {
  ticker:   Ticker,
  name:     string,
  quantity: number,
  fee:      number,
  total:    number,
  average:  number,
  value:    number, /* TODO: rename */
};

export type AltAsset = {
  ticker: Ticker,
  name:   string,
}
