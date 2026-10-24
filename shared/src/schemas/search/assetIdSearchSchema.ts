import { z } from "zod";

export const AssetIdSearchSchema = z.object({
  assetId: z.string().regex(/^[a-zA-Z0-9_-]{20}$/).length(20),
});
