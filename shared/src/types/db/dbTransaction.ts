export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Transfer: "transfer",
}

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type DbTransaction = {
  id:          string,
  assetId:     string,
  price:       number,
  quantity:    number,
  fee:         number,
  value:       number, /* as `total` in database */
  purchasedAt: Date,
};
