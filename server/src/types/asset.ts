import type { Timestamp } from "firebase-admin/firestore";

export type FsAsset = {
  id:        string,
  apiId:     number,
  ticker:    string,
  name:      string,
  deleted:   boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  deletedAt: Timestamp | undefined,
};
