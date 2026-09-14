export type Quote = {
  symbol: string,
  price:  number,
};

export type Price = {
  id:     number,
  name:   string,
  symbol: string,
  slug:   string,
  quotes: Quote[],
};
