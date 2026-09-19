import { Token } from "./token";

export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Transfer: "transfer",
}

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type Transaction = {
  token:       Token,
  quantity:    number,
  price:       number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
  /* tbd for renaming */
  transactionType: TransactionType,
};

export type TransactionTotal = {
  token:        Token,
  name:         string,
  quantity:     number,
  marketValue:  number,
  totalValue:   number,
  buyAverage:   number,
  buyTotal:     number,
  transactions: number,
};
