import type { DbTransaction } from "@shared/types/db/dbTransaction";
import { Period } from "@shared/types/period";
import type { Asset, Holding, Portfolio } from "@shared/types/portfolio";

export function buildPlaceholderMessage(message: string) {
  return { message };
}

export function buildEmptyPortfolio(): Portfolio {
  return {
    initialValue: 0,
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

/**
 * Basic calculation for the interval to work on with the CMC API.
 * This needs to be optimized as we only really need a first/last value.
 * @param timeStart
 * @param timeEnd
 */
export function getTimePeriodInterval(timeStart: Date, timeEnd: Date): string {
  return ((timeEnd.getTime() - timeStart.getTime()) / ( 60 * 60 * 24 * 1000 ) < 1.1)
    ? "5m" : "1d";
}
