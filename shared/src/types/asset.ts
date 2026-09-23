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
  id:     string,
  ticker: Ticker,
  name:   string,
}

/**
 * TODO: temporary type whilst refactoring
 */
export type DbAsset = {
  id:     string,
  ticker: Ticker,
  name:   string,
};
