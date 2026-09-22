export const Ticker = {
  ADA:  "ADA",
  DOGE: "DOGE",
  HYPE: "HYPE",
  NEO:  "NEO",
  PEPE: "PEPE",
  VET:  "VET",
  XLM:  "XLM",
  ZBCN: "ZBCN",
  ZEC:  "ZEC",
} as const;

export type Ticker = typeof Ticker[keyof typeof Ticker];
