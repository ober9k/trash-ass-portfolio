import { SymbolType } from "./token";

export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Transfer: "transfer",
}

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type Transaction = {
  symbol:      SymbolType,
  quantity:    number,
  price:       number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
  /* tbd for renaming */
  transactionType: TransactionType,
};

export type TransactionTotal = {
  symbol:       SymbolType,
  quantity:     number,
  buyAverage:   number,
  sellAverage:  number,
  buyTotal:     number,
  sellTotal:    number,
  feeTotal:     number,
  transactions: number,
};
