import { buildHoldingOptions, buildHoldingsQueryOptions, buildHoldingTransactionsOptions, buildPortfolioQueryOptions, buildTransactionOptions } from "@/api/queryOptions.ts";
import { Period } from "@shared/types/period.ts";
import type { Asset, Holding, Portfolio, Transaction } from "@shared/types/portfolio.ts";
import type { Ticker } from "@shared/types/ticker.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio | null,
  holdings:  Holding[] | null,
};

export type HoldingLoaderProps = {
  holding:      Holding,
  transactions: Transaction[],
};

export type TransactionLoaderProps = {
  // asset:       Asset,
  transaction: Transaction,
};

export async function rootBeforeLoader(): Promise<string> {
  return "rootBeforeLoader";
}

export async function portfolioLoader({ context, deps }: any): Promise<PortfolioLoaderProps> {
  try {
    const portfolio = await context.queryClient.query(buildPortfolioQueryOptions(deps));
    const holdings =  await context.queryClient.query(buildHoldingsQueryOptions(deps));

    return { portfolio, holdings };
  }
  catch (error) {
    // catch and let components render failure
    // this is just assuming any error (even if Axios)
    return { portfolio: null, holdings: null };
  }
}

export async function transactionsLoader({ context, params, deps }: any): Promise<HoldingLoaderProps> {
  const ticker = params.tokenId.toUpperCase() as Ticker; /* add validation */
  return {
    holding:      await context.queryClient.query(buildHoldingOptions(ticker, deps)),
    transactions: await context.queryClient.query(buildHoldingTransactionsOptions(ticker, deps)),
  };
}

export async function transactionLoader({ context, params }: any): Promise<TransactionLoaderProps> {
  return {
    transaction: await context.queryClient.query(buildTransactionOptions(params.transactionId)),
  };
}

type PeriodSearch = {
  period?: Period,
};

export function handlePeriodSearch({ search }: PeriodSearch) {
  return { period: search.period };
}

function isValidPeriod(period: string): period is Period {
  return (Object.values(Period) as string[]).includes(period);
}

export function validatePeriodSearch(search: PeriodSearch) {
  const { period } = search;
  const result = { period: "" };

  if (typeof period === "string" && isValidPeriod(period)) {
    result.period = period;
  }
  else {
    delete result.period;
  }

  return result;
}
