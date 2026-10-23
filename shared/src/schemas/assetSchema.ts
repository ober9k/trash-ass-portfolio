import { z } from "zod";

export const AssetSchema = z.object({
  apiId:   z.number().min(0), /* maps to CMC API asset's ID */
  name:    z.string().min(0),
  ticker:  z.string().min(0),
});

export type AssetData = z.infer<typeof AssetSchema>;
