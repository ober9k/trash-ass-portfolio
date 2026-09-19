import { type Portfolio } from "@shared/types/portfolio.ts";
import type { Asset } from "@shared/types/asset.ts";
import { type Transaction, type TransactionTotal } from "@shared/types/transaction.ts";
import axios from "axios";

const RootApiPath = "http://localhost/"; /* TODO: .env instead */
const RootApiPort = "8080";              /* TODO: .env instead */

/**
 * Build standardised URL for API usage.
 */
export function buildApiUrl(...parts: string[]): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", ...parts].join("/");

  return url.toString();
}

export async function fetchPortfolio({ queryKey }: { queryKey: readonly string[] }): Promise<Portfolio> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Portfolio;
}

export async function fetchTokens({ queryKey }: { queryKey: readonly string[] }): Promise<Asset[]> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Asset[];
}

export async function fetchTransactions({ queryKey }: { queryKey: readonly string[] }): Promise<Transaction[]> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Transaction[];
}

/* todo, rename */
export async function fetchTransactionTotal({ queryKey }: { queryKey: readonly string[] }): Promise<TransactionTotal[]> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as TransactionTotal[];
}

