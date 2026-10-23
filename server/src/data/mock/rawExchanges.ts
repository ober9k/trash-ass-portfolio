/**
 * Seed data... these IDs are intended to be fixed.
 */
export const rawExchanges = [
  [ "mdifYlGNNIPZtQEHcx3d", "Binance", "https://www.binance.com/" ],
  [ "1eBeswZyEcOATw70HGXs", "BTC Markets", "https://www.btcmarkets.net/" ],
  [ "mqWBTJbs6NKsCZmHhRzE", "ByBit", "https://www.bybit.com/" ],
  [ "KmcXzV6VQY5fmgUTDEv3", "CoinSpot", "https://www.coinspot.com.au/" ],
];

export const mappedExchanges = rawExchanges
  .map(([ id, name, website ]) => ({ id, name, website }));
