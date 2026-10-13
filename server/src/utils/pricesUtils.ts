import type { QuotedAsset } from "@/utils/apiUtils";

export function byApiId(apiId: number) {
  return (quotedAsset: QuotedAsset) => quotedAsset.apiId === apiId;
}
