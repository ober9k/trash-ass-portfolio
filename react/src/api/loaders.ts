import { buildHoldingOptions, buildHoldingsQueryOptions, buildHoldingTransactionsOptions, buildPortfolioQueryOptions } from "@/api/queryOptions.ts";
import type { Holding, Transaction, Portfolio } from "@shared/types/portfolio.ts";
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

export async function portfolioLoader({ context }: any): Promise<PortfolioLoaderProps> {
  return {
    portfolio: await context.queryClient.query(buildPortfolioQueryOptions()),
    holdings:  await context.queryClient.query(buildHoldingsQueryOptions()),
  };
}

export async function transactionsLoader({ context, params }: any): Promise<HoldingLoaderProps> {
  const ticker = params.tokenId.toUpperCase() as Ticker; /* add validation */

  return {
    holding:      await context.queryClient.query(buildHoldingOptions(ticker)),
    transactions: await context.queryClient.query(buildHoldingTransactionsOptions(ticker)),
  };
}

