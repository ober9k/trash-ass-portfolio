export const Symbol = {
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

export type SymbolType = typeof Symbol[keyof typeof Symbol];

export type Token = {
  name:     string,
  symbol:   SymbolType,
  quantity: number,
  fee:      number,
  total:    number,
  average:  number,
};
