export const Ticker = {
  ADA:     "ADA",
  AXS:     "AXS",
  DOGE:    "DOGE",
  HYPE:    "HYPE",
  NEO:     "NEO",
  PEPE:    "PEPE",
  SPX:     "SPX",
  SOL:     "SOL",
  VET:     "VET",
  XLM:     "XLM",
  XRP:     "XRP",
  ZBCN:    "ZBCN",
  ZEC:     "ZEC",

} as const;

export type Ticker = typeof Ticker[keyof typeof Ticker];

export const allTickers = [
  Ticker.ADA,
  Ticker.AXS,
  Ticker.DOGE,
  Ticker.HYPE,
  Ticker.NEO,
  Ticker.PEPE,
  Ticker.SPX,
  Ticker.SOL,
  Ticker.VET,
  Ticker.XLM,
  Ticker.XRP,
  Ticker.ZBCN,
  Ticker.ZEC,
];
