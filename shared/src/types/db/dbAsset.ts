import { Ticker } from "../ticker";

export type DbAsset = {
  id:     string,
  apiId:  number, /* associated with CMC API */
  ticker: Ticker,
  name:   string,
};
