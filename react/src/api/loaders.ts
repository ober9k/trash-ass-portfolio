import { portfolioQueryOptions, tokensQueryOptions, tokenTransactionsTotalOptions, transactionsQueryOptions } from "@/api/queryOptions.ts";
import { type Portfolio } from "@shared/types/portfolio.ts";
import type { Asset } from "@shared/types/asset.ts";
import type { Transaction, TransactionTotal } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio,
  tokens:    Asset[],
};

export type TransactionsLoaderProps = {
  transactions: Transaction[],
  transactionTotal: TransactionTotal,
};

export async function portfolioLoader({ context }): Promise<PortfolioLoaderProps> {
  return {
    portfolio: await context.queryClient.query(portfolioQueryOptions),
    tokens:    await context.queryClient.query(tokensQueryOptions),
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

