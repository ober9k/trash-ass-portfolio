import type { DbAsset } from "@shared/types/db/dbAsset";
import type { DbSummary } from "@shared/types/db/dbSummary";
import type { DbTransaction } from "@shared/types/db/dbTransaction";
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

export function buildBaseHoldingFromAssetAndSummary(dbAsset: DbAsset, dbSummary: DbSummary): Holding {
  const asset = {
    ...dbAsset,
  };

  const summary = {
    quantity:     dbSummary.quantity,
    fee:          dbSummary.fee,
    initialValue: dbSummary.initialValue,
    currentValue: dbSummary.initialValue,
    averagePrice: dbSummary.quantity / dbSummary.initialValue,
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
