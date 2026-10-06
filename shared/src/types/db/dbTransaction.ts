export type DbTransaction = {
  id:          string,
  assetId:     string,
  type:        string | undefined, /* TODO: enforce value (optional value for now) */
  price:       number,
  quantity:    number,
  fee:         number,
  value:       number, /* as `total` in database */
  purchasedAt: Date,
};
