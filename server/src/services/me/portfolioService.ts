import { getHistoricPrices, getLatestPrices } from "@/apis/prices";
import { fetchSummariesByAccountId } from "@/apis/summaries";
import { buildEmptyPortfolio } from "@/utils";
import { byApiId } from "@/utils/pricesUtils";
import { calculateQuotedValue, mapApiIds } from "@/utils/summariesUtils";
import { Period } from "@shared/types/period";
import type { Portfolio } from "@shared/types/portfolio";

/**
 * Retrieve a basic summary of the portfolio.
 */
export async function getUserPortfolio(accountId: string, period: Period): Promise<Portfolio> {
  const periodParam = (period) ? period : null;

  const validPeriods = [
    Period.OneHour,
    Period.OneDay,
    Period.OneWeek,
    Period.OneMonth,
    Period.OneYear,
  ].map((p) => p.toString());

  const summaries = await fetchSummariesByAccountId(accountId);
  // const summaries = [];

  if (summaries.length === 0) {
    return buildEmptyPortfolio(); /* fix for handling later case */
  }

  const apiIds = mapApiIds(summaries);
  const currentPrices = await getLatestPrices(apiIds);
  const historicPrices = (validPeriods.includes(periodParam as Period))
    ? await getHistoricPrices(apiIds, periodParam as Period)
    : [];

  return summaries.reduce((p, s) => {
    const currentQuotedAsset  = currentPrices.find(byApiId(s.apiId));
    const historicQuotedAsset = historicPrices.find(byApiId(s.apiId));

    p.currentValue  += calculateQuotedValue(s, currentQuotedAsset);
    p.adjustedValue += historicQuotedAsset ? calculateQuotedValue(s, historicQuotedAsset) : s.initialValue;
    p.initialValue  += s.initialValue;
    p.holdings++;
    return p;
  }, buildEmptyPortfolio());
}
