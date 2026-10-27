import type { CreatedAt, DeletedAt, UpdatedAt } from "@/types/util";

export type FsAsset = {
  id:        string,
  apiId:     number,
  ticker:    string,
  name:      string,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
};
