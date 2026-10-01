import { buildHoldingOptions, buildHoldingsQueryOptions, buildHoldingTransactionsOptions, buildPortfolioQueryOptions } from "@/api/queryOptions.ts";
import { Period } from "@shared/types/period.ts";
import type { Holding, Portfolio, Transaction } from "@shared/types/portfolio.ts";
import type { Ticker } from "@shared/types/ticker.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio,
  holdings:  Holding[],
};

export type HoldingLoaderProps = {
  holding:      Holding,
  transactions: Transaction[],
};

export async function rootBeforeLoader(): Promise<string> {
  return "rootBeforeLoader";
}

export async function portfolioLoader({ context, deps }: any): Promise<PortfolioLoaderProps> {
  return {
    portfolio: await context.queryClient.query(buildPortfolioQueryOptions(deps)),
    holdings:  await context.queryClient.query(buildHoldingsQueryOptions(deps)),
  };
}

export async function transactionsLoader({ context, params, deps }: any): Promise<HoldingLoaderProps> {
  const ticker = params.tokenId.toUpperCase() as Ticker; /* add validation */
  return {
    holding:      await context.queryClient.query(buildHoldingOptions(ticker, deps)),
    transactions: await context.queryClient.query(buildHoldingTransactionsOptions(ticker, deps)),
  };
}

type PeriodSearch = {
  search: Record<string, string>;
};

export function handlePeriodSearch({ search }: PeriodSearch) {
  console.log("handlePeriodSearch");
  return { period: search.period };
}

function isValidPeriod(period: string): period is Period {
  return (Object.values(Period) as string[]).includes(period);
}

export function validatePeriodSearch(search: PeriodSearch) {
  console.log("validatePeriodSearch");
  const { period } = search;
  const result = { period: "" };

  if (typeof period === "string" && isValidPeriod(period)) {
    result.period = period;
  }
  else {
    result.period = Period.All;
  }

  return result;
}
