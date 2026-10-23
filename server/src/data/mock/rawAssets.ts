/**
 * Seed data... these IDs are intended to be fixed.
 */
export const rawAssets = [
  [ "RKDTd60F9LEhzZXt06Hc", 2010,  "Cardano",       "ADA" ],
  [ "ILRq5GqgGjJGdqWyeZCt", 3794,  "Cosmos",        "ATOM" ],
  [ "8owO6gGSmiW4h1TbizLk", 6783,  "Axie Infinity", "AXS" ],
  [ "CzjzEKxi8xsR5O6kQpH6", 1,     "Bitcoin",       "BTC" ],
  [ "wIth17QKakQhX5DK37ak", 74,    "DogeCoin",      "DOGE" ],
  [ "3ZXciucEVL4CqkdogQpR", 6636,  "Polkadot",      "DOT" ],
  [ "jSZCBPVjtJXtnG4Bdg80", 1027,  "Ethereum",      "ETH" ],
  [ "h3IxB12rFAHPLDrE4SL1", 32196, "Hyperliquid",   "HYPE" ],
  [ "HG8bfgfaeL4csjY5ekAz", 1376,  "NEO",           "NEO" ],
  [ "T9p7qLlwl6i71UUzYRLt", 24478, "Pepe",          "PEPE" ],
  [ "KrtrQZPHRY5vV8zpacM0", 36507, "Pump.fun",      "PUMP" ],
  [ "57yjGL9ezaCa4Xz2sSf6", 5426,  "SPX6900",       "SPX" ],
  [ "H1fsgf6ZGv9yq3Z7L8hx", 28081, "Solana",        "SOL" ],
  [ "Lk3Buq8ebGsQKdhxDq91", 3077,  "VeChain",       "VET" ],
  [ "HZOcuMg2nDhiNL7cPT4V", 512,   "Stellar",       "XLM" ],
  [ "hzTAhd5dUqBbveu0kl8A", 52,    "XRP",           "XRP" ],
  [ "8s0rz0uekELlmOXLws5C", 30636, "Zebec Network", "ZBCN" ],
  [ "zTF8gLrD49HnMtnhQlBM", 1437,  "Zcash",         "ZEC" ],
];

export const mappedAssets = rawAssets
  .map(([ id, apiId, name, ticker ]) => ({ id, apiId, name, ticker }));
