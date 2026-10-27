import type { FieldValue, Timestamp } from "firebase-admin/firestore";
import type { CreatedAt, DeletedAt, UpdatedAt } from "@/types/util";

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
  createdAt:   CreatedAt,
  updatedAt:   UpdatedAt,
  deletedAt:   DeletedAt,
};
