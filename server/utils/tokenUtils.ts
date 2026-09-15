import { Symbol, type SymbolType } from "@shared/types/token";

const tokenNames = new Map<string, string>()
  .set(Symbol.ADA,  "Cardano")
  .set(Symbol.DOGE, "DogeCoin")
  .set(Symbol.HYPE, "Hyperliquid")
  .set(Symbol.NEO,  "Neo")
  .set(Symbol.PEPE, "Pepe")
  .set(Symbol.VET,  "VeChain")
  .set(Symbol.XLM,  "Stellar")
  .set(Symbol.ZBCN, "Zebec Network")
  .set(Symbol.ZEC,  "Zcash");

export function getTokenName(symbol: SymbolType): string {
  return tokenNames.get(symbol);
}
