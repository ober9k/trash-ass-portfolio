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
