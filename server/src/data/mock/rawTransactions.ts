export const rawTransactions = [];

export const mappedTransactions = rawTransactions.map((rt) => {
  const [ ticker, quantity, price, fee, total, purchasedAt ] = rt;
  return { ticker, quantity, price, fee, initialValue: total, purchasedAt: new Date(purchasedAt) };
});
