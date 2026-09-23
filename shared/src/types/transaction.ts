import { AltAsset } from "./asset";
import { Ticker } from "./ticker";

export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Transfer: "transfer",
}

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type Transaction = {
  ticker:      Ticker,
  quantity:    number,
  price:       number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
  /* tbd for renaming */
  transactionType: TransactionType,
};

export type AssetTransaction = {
  id:          string,
  accountId:   string,
  assetId:     string,
  price:       number,
  quantity:    number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
  /* extra */
  currentValue: number,
  asset:       AltAsset,
}

export type DbTransaction = {
  id:          string,
  accountId:   string,
  assetId:     string,
  price:       number,
  quantity:    number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
};
