import { type AltAsset } from "./asset";

export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Transfer: "transfer",
}

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

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
  price:       number,
  quantity:    number,
  fee:         number,
  value:       number, /* as `total` in database */
  purchasedAt: Date,
};
