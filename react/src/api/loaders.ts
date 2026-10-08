import { buildAssetByTickerQueryOptions, buildAssetQueryOptions, buildHoldingOptions, buildHoldingsQueryOptions, buildHoldingTransactionsOptions, buildPortfolioQueryOptions, buildTransactionOptions } from "@/api/queryOptions.ts";
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

export type TransactionAddLoaderProps = {
  asset: Asset,
};

export type TransactionUpdateLoaderProps = {
  asset:       Asset,
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
  const holdingId = params.holdingId.toUpperCase() as Ticker; /* add validation */
  return {
    holding:      await context.queryClient.query(buildHoldingOptions(holdingId, deps)),
    transactions: await context.queryClient.query(buildHoldingTransactionsOptions(holdingId, deps)),
  };
}

export async function transactionAddLoader({ context, params }: any): Promise<TransactionAddLoaderProps> {
  return {
    asset: await context.queryClient.query(buildAssetByTickerQueryOptions(params.holdingId)),
  };
}

export async function transactionUpdateLoader({ context, params }: any): Promise<TransactionUpdateLoaderProps> {
  const transaction = await context.queryClient.query(buildTransactionOptions(params.transactionId));

  return {
    asset:       await context.queryClient.query(buildAssetQueryOptions(transaction.assetId)),
    transaction: transaction,
  };
}
