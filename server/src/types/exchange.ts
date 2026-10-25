import type { Timestamp } from "firebase-admin/firestore";

export type FsExchange = {
  id:        string,
  name:      string,
  website:   string,
  deleted:   boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  deletedAt: Timestamp | undefined,
};
