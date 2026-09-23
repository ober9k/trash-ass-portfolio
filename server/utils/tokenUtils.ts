import { Ticker } from "@shared/types/ticker";

const getAssetName = new Map<Ticker, string>()
  .set(Ticker.ADA,  "Cardano")
  .set(Ticker.DOGE, "DogeCoin")
  .set(Ticker.HYPE, "Hyperliquid")
  .set(Ticker.NEO,  "NEO")
  .set(Ticker.PEPE, "PEPE")
  .set(Ticker.VET,  "VeChain")
  .set(Ticker.XLM,  "Stellar")
  .set(Ticker.ZBCN, "Zebec Network")
  .set(Ticker.ZEC,  "Zcash");

export function getTokenName(ticker: Ticker): string {
  return getAssetName.get(ticker);
}
