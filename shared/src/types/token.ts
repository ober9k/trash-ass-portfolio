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
