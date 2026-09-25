import { Ticker } from "../ticker";

export type DbAsset = {
  id:     string,
  ticker: Ticker,
  name:   string,
};
