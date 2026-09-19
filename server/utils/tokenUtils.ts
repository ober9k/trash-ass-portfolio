import { Token } from "@shared/types/token";

const tokenNames = new Map<string, string>()
  .set(Token.ADA,  "Cardano")
  .set(Token.DOGE, "DogeCoin")
  .set(Token.HYPE, "Hyperliquid")
  .set(Token.NEO,  "NEO")
  .set(Token.PEPE, "PEPE")
  .set(Token.VET,  "VeChain")
  .set(Token.XLM,  "Stellar")
  .set(Token.ZBCN, "Zebec Network")
  .set(Token.ZEC,  "Zcash");

export function getTokenName(symbol: Token): string {
  return tokenNames.get(symbol);
}
