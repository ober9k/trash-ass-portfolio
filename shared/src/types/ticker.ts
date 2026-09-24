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
