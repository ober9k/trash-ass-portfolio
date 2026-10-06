export const TransactionType = {
  Buy:      "buy",
  Sell:     "sell",
  Yield:    "yield",
  Transfer: "transfer",
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];
