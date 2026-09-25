import type { DbTransaction } from "@shared/types/db/dbTransaction";
import type { Asset, Holding, Portfolio } from "@shared/types/portfolio";

export function buildPlaceholderMessage(message: string) {
  return { message };
}

export function buildEmptyPortfolio(): Portfolio {
  return {
    value:        0,
    currentValue: 0,
    holdings:     0,
  };
}

export function buildEmptyHolding(asset: Asset): Holding {
  const summary = {
    quantity:     0,
    fee:          0,
    value:        0,
    currentValue: 0,
    averagePrice: 0,
  };

  return { asset, summary };
}

export function getDistinctAssetIds(transactions: DbTransaction[]): string[] {
  return [ ...new Set(transactions.map((t) => t.assetId)) ];
}
