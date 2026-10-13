import { buildAssetQueryOptions, buildHoldingOptions, buildHoldingsQueryOptions, buildHoldingTransactionsOptions, buildPortfolioQueryOptions, buildTransactionOptions } from "@/api/queryOptions.ts";
import type { Asset, Holding, Portfolio, Transaction } from "@shared/types/portfolio.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio | null,
  holdings:  Holding[] | null,
};

export type HoldingLoaderProps = {
  holding:      Holding,
  transactions: Transaction[],
};

export type TransactionCreateLoaderProps = {
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
  return {
    holding:      await context.queryClient.query(buildHoldingOptions(params.holdingId, deps)),
    transactions: await context.queryClient.query(buildHoldingTransactionsOptions(params.holdingId, deps)),
  };
}

export async function transactionCreateLoader({ context, params }: any): Promise<TransactionCreateLoaderProps> {
  return {
    asset: await context.queryClient.query(buildAssetQueryOptions(params.holdingId)),
  };
}

export async function transactionUpdateLoader({ context, params }: any): Promise<TransactionUpdateLoaderProps> {
  return {
    asset:       await context.queryClient.query(buildAssetQueryOptions(params.holdingId)),
    transaction: await context.queryClient.query(buildTransactionOptions(params.holdingId, params.transactionId)),
  };
}
