import { helloQueryOptions, portfolioAssetsQueryOptions, portfolioSummaryQueryOptions, tokenTransactionsTotalOptions, transactionsQueryOptions } from "@/api/queryOptions.ts";
import type { PortfolioAsset, PortfolioSummary } from "@shared/types/portfolio.ts";
import type { Transaction, TransactionTotal } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  hello:            any,
  portfolioSummary: PortfolioSummary,
  portfolioAssets:  PortfolioAsset[],
};

export type TransactionsLoaderProps = {
  transactions: Transaction[],
  transactionTotal: TransactionTotal,
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
    queryKey: [ ...transactionsQueryOptions.queryKey, params.tokenId, "transactions" ]
  };

  const transactionTotalOption = {
    ...tokenTransactionsTotalOptions,
    queryKey: [ ...tokenTransactionsTotalOptions.queryKey, params.tokenId, "summary" ]
  };

  return {
    transactions: await context.queryClient.query(transactionsOption),
    transactionTotal: await context.queryClient.query(transactionTotalOption)
  };
}

