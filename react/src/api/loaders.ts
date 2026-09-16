import { portfolioQueryOptions, tokensQueryOptions, transactionsQueryOptions } from "@/api/queryOptions.ts";
import { type Portfolio } from "@shared/types/portfolio.ts";
import type { Token } from "@shared/types/token.ts";
import type { Transaction } from "@shared/types/transaction.ts";

export type PortfolioLoaderProps = {
  portfolio: Portfolio,
  tokens:    Token[],
};

export type TransactionsLoaderProps = {
  transactions: Transaction[],
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

  return {
    transactions: await context.queryClient.query({ queryKey: newQueryKey, queryFn }),
  };
}

