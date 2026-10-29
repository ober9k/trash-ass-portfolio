import { getHistoricPrices, getLatestPrices } from "@/apis/prices";
import { dbFetchAsset, dbFetchAssetsByIds } from "@/services/assetsService";
import { fetchUserSummaries, fetchUserSummaryByAssetId, refreshSummaryData } from "@/services/me/summariesService";
import { buildBaseHoldingFromAssetAndSummary } from "@/utils";
import { byApiId } from "@/utils/pricesUtils";
import { calculateQuotedValue, mapApiIds, mapAssetIds } from "@/utils/summariesUtils";
import { Period } from "@shared/types/period";
import type { Holding } from "@shared/types/portfolio";

/**
 * Retrieve all associated holdings.
 */
export async function getUserHoldings(userId: string, period: Period): Promise<Holding[]> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchUserSummaries(userId);
  // const summaries = [];

  const assetIds = mapAssetIds(summaries);
  const apiIds = mapApiIds(summaries);
  const currentPrices  = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  const assets = await dbFetchAssetsByIds(assetIds);
  const holdings = [];

  /* TODO: initial to check it works, need to tidy up */
  for (let a of assets) {
    const s = summaries.find((t) => t.assetId === a.id);
    const currentQuotedAsset  = currentPrices.find(byApiId(s.apiId));
    const historicQuotedAsset = historicPrices.find(byApiId(s.apiId));

    const holding = buildBaseHoldingFromAssetAndSummary(a, s);
    holding.summary.currentValue  += calculateQuotedValue(s, currentQuotedAsset);
    holding.summary.adjustedValue += historicQuotedAsset ? calculateQuotedValue(s, historicQuotedAsset) : s.initialValue;
    holding.summary.initialValue  += s.initialValue;

    holdings.push(holding);
  }

  holdings.sort((a: Holding, b: Holding) => {
    return b.summary.currentValue - a.summary.currentValue;
  });

  return holdings;
}

/**
 * Retrieve holding asset/summary based on the provided ticker.
 */
export async function getUserHoldingByAssetId(userId: string, assetId: string): Promise<Holding> {
  const asset   = await dbFetchAsset(assetId);
  const summary = await fetchUserSummaryByAssetId(userId, assetId);
  const currentPrices = await getLatestPrices([asset.apiId]);
  const currentQuotedAsset = currentPrices.find(byApiId(asset.apiId));

  const holding = buildBaseHoldingFromAssetAndSummary(asset, summary);
  holding.summary.currentValue = calculateQuotedValue(summary, currentQuotedAsset);

  return holding;
}

export async function refreshUserHoldingByAssetId(userId: string, assetId: string): Promise<boolean> {
  await refreshSummaryData(userId, assetId);
  return true; /* exception should otherwise be thrown */
}
