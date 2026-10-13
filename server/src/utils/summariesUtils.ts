import type { DbSummary } from "@shared/types/db/dbSummary";
import type { Summary } from "@shared/types/portfolio";
import type { QuotedAsset } from "@/utils/apiUtils";

export function mapAssetIds(summaries: DbSummary[]): string[] {
  return summaries.map((s) => s.assetId);
}

export function mapApiIds(summaries: DbSummary[]): number[] {
  return summaries.map((s) => s.apiId);
}

export function calculateQuotedValue(summary: Partial<Summary>, quotedAsset: QuotedAsset) {
  return summary.quantity * quotedAsset.quote.price;
}
