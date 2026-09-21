export const Token = {
  ADA:  "ada",
  DOGE: "doge",
  HYPE: "hype",
  NEO:  "neo",
  PEPE: "pepe",
  VET:  "vet",
  XLM:  "xlm",
  ZBCN: "zbcn",
  ZEC:  "zec",
} as const;

export type Token = typeof Token[keyof typeof Token];

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
