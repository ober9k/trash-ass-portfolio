import { Ticker } from "@shared/types/ticker";

export type DbAsset = {
  id:     string,
  apiId:  number, /* associated with CMC API */
  ticker: Ticker | string,
  name:   string,
};
