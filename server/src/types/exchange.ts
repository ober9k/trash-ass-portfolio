import type { CreatedAt, DeletedAt, UpdatedAt } from "@/types/util";

export type FsExchange = {
  id:        string,
  name:      string,
  website:   string,
  deleted:   boolean,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
};
