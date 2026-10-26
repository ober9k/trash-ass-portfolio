import type { FieldValue, Timestamp } from "firebase-admin/firestore";

export type FsTransaction = {
  id:          string,
  accountId:   string,
  assetId:     string,
  type:        string,
  price:       number,
  quantity:    number,
  fee:         number,
  value:       number,
  purchasedAt: Timestamp | FieldValue,
  deleted:     boolean,
  createdAt:   Timestamp,
  updatedAt:   Timestamp | FieldValue,
  deletedAt:   Timestamp | undefined,
};
