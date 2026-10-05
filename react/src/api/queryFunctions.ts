import { buildApiUrlFromQueryKey } from "@/api/utils.ts";
import { getInitialAuthState } from "@/firebase.ts";
import type { Holding, Transaction, Portfolio } from "@shared/types/portfolio.ts";
import type { QueryKey } from "@tanstack/react-query";
import axios from "axios";

export async function getAuthConfig() {
  const user = await getInitialAuthState();

  if (!user) {
    return {};
  }

  const idToken = await user.getIdToken(true);

  return {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    },
  }
}

export async function fetchPortfolio({ queryKey }: { queryKey: QueryKey[] }): Promise<Portfolio> {
  const { data } = await axios.get(buildApiUrlFromQueryKey(queryKey));
  return data as Portfolio;
}

export async function fetchHoldings({ queryKey }: { queryKey: QueryKey[] }): Promise<Holding[]> {
  const { data } = await axios.get(buildApiUrlFromQueryKey(queryKey));
  return data as Holding[];
}

export async function fetchHoldingByTicker({ queryKey }: { queryKey: QueryKey[] }): Promise<Holding> {
  const { data } = await axios.get(buildApiUrlFromQueryKey(queryKey));
  return data as Holding;
}

export async function fetchHoldingTransactionsByTicker({ queryKey }: { queryKey: QueryKey[] }): Promise<Transaction[]> {
  const { data } = await axios.get(buildApiUrlFromQueryKey(queryKey));
  return data as Transaction[];
}

export async function fetchTransaction({ queryKey }: { queryKey: QueryKey[] }): Promise<Transaction> {
  const { data } = await axios.get(buildApiUrlFromQueryKey(queryKey));
  return data as Transaction;
}
