import type { Holding, HoldingAsset } from "@shared/types/holding";

export function buildPlaceholderMessage(message: string) {
  return { message };
}

export function buildEmptyHolding(asset: HoldingAsset): Holding {
  const summary = {
    quantity:     0,
    fee:          0,
    value:        0,
    currentValue: 0,
    averagePrice: 0,
  };

  return { asset, summary };
}
