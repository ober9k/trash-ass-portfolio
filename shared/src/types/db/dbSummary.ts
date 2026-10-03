export type DbSummary = {
  id:           string,
  assetId:      string,
  apiId:        number,
  quantity:     number,
  fee:          number,
  initialValue: number, /* as `total` in database */
  createdAt:    Date,
  updatedAt:    Date,
};
