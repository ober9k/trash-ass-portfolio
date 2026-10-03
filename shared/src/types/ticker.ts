export const Ticker = {
  ADA:     "ADA",
  ATOM:    "ATOM",
  AXS:     "AXS",
  DOGE:    "DOGE",
  DOT:     "DOT",
  HYPE:    "HYPE",
  NEO:     "NEO",
  PEPE:    "PEPE",
  PUMP:    "PUMP",
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
  Ticker.ATOM,
  Ticker.AXS,
  Ticker.DOGE,
  Ticker.DOT,
  Ticker.HYPE,
  Ticker.NEO,
  Ticker.PEPE,
  Ticker.PUMP,
  Ticker.SPX,
  Ticker.SOL,
  Ticker.VET,
  Ticker.XLM,
  Ticker.XRP,
  Ticker.ZBCN,
  Ticker.ZEC,
];
