import { SymbolType } from "./token";

export type Transaction = {
  symbol:      SymbolType,
  quantity:    number,
  price:       number,
  fee:         number,
  total:       number,
  purchasedAt: Date,
};
