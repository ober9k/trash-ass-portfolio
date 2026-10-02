export type DbSummary = {
  id:        string,
  assetId:   string,
  apiId:     number,
  quantity:  number,
  fee:       number,
  value:     number, /* as `total` in database */
  updatedAt: Date,
};
