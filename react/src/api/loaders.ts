import { helloQueryOptions, portfolioAssetQueryOptions, portfolioAssetsQueryOptions, portfolioSummaryQueryOptions, transactionsQueryOptions } from "@/api/queryOptions.ts";
import type { PortfolioAsset, PortfolioSummary } from "@shared/types/portfolio.ts";
import type { Transaction } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  hello:            any,
  portfolioSummary: PortfolioSummary,
  portfolioAssets:  PortfolioAsset[],
};

export type TransactionsLoaderProps = {
  transactions: Transaction[],
  portfolioAsset: PortfolioAsset,
};

export async function portfolioLoader({ context }): Promise<PortfolioLoaderProps> {
  return {
    hello:            await context.queryClient.query(helloQueryOptions),
    portfolioSummary: await context.queryClient.query(portfolioSummaryQueryOptions),
    portfolioAssets:  await context.queryClient.query(portfolioAssetsQueryOptions),
  };
}

export async function transactionsLoader({ context, params }): Promise<TransactionsLoaderProps> {
  const { queryKey, queryFn } = transactionsQueryOptions;
  const newQueryKey = [ ...queryKey, params.tokenId, "transactions" ];

  const transactionsOption = {
    ...transactionsQueryOptions,
    queryKey: [ ...transactionsQueryOptions.queryKey, params.tokenId.toUpperCase() ]
  };

  return {
    transactions: await context.queryClient.query(transactionsOption),
    portfolioAsset: await context.queryClient.query({
      queryKey: [...portfolioAssetQueryOptions.queryKey, params.tokenId.toUpperCase(), "summary"],
      queryFn:  portfolioAssetQueryOptions.queryFn,
    }),
  };
}

