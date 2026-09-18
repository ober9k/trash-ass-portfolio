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
  name:         string,
  quantity:     number,
  marketValue:  number,
  totalValue:   number,
  buyAverage:   number,
  buyTotal:     number,
  transactions: number,
};
